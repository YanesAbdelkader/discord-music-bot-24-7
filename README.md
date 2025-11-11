# Discord Music Bot 24/7

This is a simple Discord music bot designed to play a single audio file on a continuous loop in a designated voice channel, 24/7. It's built with Node.js and the Discord.js library, providing a lightweight and reliable solution for constant background music or ambiance in your Discord server.

## How it Works

The bot connects to a specified voice channel in your Discord server and plays a pre-configured audio file. Once the song finishes, it automatically restarts, ensuring continuous playback. It also includes basic error handling and reconnection logic to maintain uptime.

## Features

-   **24/7 Playback:** Designed for continuous, uninterrupted music.
-   **Auto-Reconnect:** Attempts to rejoin the voice channel if disconnected.
-   **Simple Configuration:** Easy setup using environment variables.

## Setup and Configuration

To get this bot running, you'll need to set up a few environment variables and install the necessary dependencies.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd discord-music-bot-24-7
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Create a file named `.env` in the root directory of the project. This file will store your bot's configuration.

4.  **Configure Environment Variables:**
    Open the `.env` file and add the following variables, replacing the placeholder values with your actual Discord bot and server information:

    ```
    TOKEN="YOUR_DISCORD_BOT_TOKEN"
    GUILD_ID="YOUR_DISCORD_SERVER_ID"
    VOICE_CHANNEL_ID="YOUR_VOICE_CHANNEL_ID"
    SONG_PATH="path/to/your/song.mp3"
    ```
    *   `TOKEN`: Your Discord bot's token. You can get this from the [Discord Developer Portal](https://discord.com/developers/applications).
    *   `GUILD_ID`: The ID of the Discord server (guild) where the bot will operate.
    *   `VOICE_CHANNEL_ID`: The ID of the voice channel where the bot will play music.
    *   `SONG_PATH`: The relative or absolute path to the audio file you want the bot to play. For example, if your song is in a `songs` folder named `my_song.mp3`, this would be `songs/my_song.mp3`.

5.  **Place your song file:**
    Ensure your audio file is located at the path specified in `SONG_PATH`.

## Running the Bot

Once configured, you can start the bot using:

```bash
node index.js
```

The bot should then connect to your specified voice channel and start playing the song.
