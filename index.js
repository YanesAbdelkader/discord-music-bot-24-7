require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  entersState,
  VoiceConnectionStatus,
} = require("@discordjs/voice");
const path = require("path");
const fs = require("fs");

const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const VOICE_CHANNEL_ID = process.env.VOICE_CHANNEL_ID;
const SONG_PATH = process.env.SONG_PATH;

const AUDIO_FILE = path.join(__dirname, SONG_PATH);

if (!fs.existsSync(AUDIO_FILE)) {
  console.error("Audio file not found:", AUDIO_FILE);
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

async function connectToChannel() {
  const guild = await client.guilds.fetch(GUILD_ID);
  const channel = await guild.channels.fetch(VOICE_CHANNEL_ID);

  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
  });

  connection.on(VoiceConnectionStatus.Disconnected, async () => {
    try {
      await Promise.race([
        entersState(connection, VoiceConnectionStatus.Signalling, 5000),
        entersState(connection, VoiceConnectionStatus.Connecting, 5000),
      ]);
      console.log("Reconnecting voice...");
    } catch {
      console.log("Rejoining voice channel...");
      connectToChannel();
    }
  });

  return connection;
}

function playLoop(connection) {
  const player = createAudioPlayer();
  const resource = createAudioResource(AUDIO_FILE);

  player.play(resource);
  connection.subscribe(player);

  player.on(AudioPlayerStatus.Idle, () => {
    console.log("Song ended — restarting.");
    playLoop(connection);
  });

  player.on("error", (err) => {
    console.error("Playback error:", err.message);
    setTimeout(() => playLoop(connection), 5000);
  });
}

client.once("clientReady", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  const connection = await connectToChannel();
  playLoop(connection);
});

client.login(TOKEN);