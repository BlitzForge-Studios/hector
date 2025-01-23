import {
    ActivityType,
    Client,
    Collection,
    GatewayIntentBits,
    Status,
} from "discord.js";
import fs from "fs";
import { TOKEN } from "../config.js";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
    ],
    presence: {
        status: Status.Idle,
        activities: [
            {
                name: "Dungeon Blitz: Remake #gathering",
                type: ActivityType.Playing,
                url: "https://blitzforge-studios.github.io/dbr-demo/",
                state: "Play demo with Discord's App Launcher.",
            },
        ],
    },
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

async function loadFunctions() {
    const functionFolders = fs.readdirSync("./src/functions");

    for (const folder of functionFolders) {
        const functionFiles = fs
            .readdirSync(`./src/functions/${folder}`)
            .filter((file) => file.endsWith(".js"));

        for (const file of functionFiles) {
            try {
                const { default: func } = await import(
                    `./functions/${folder}/${file}`
                );
                func(client);
                console.log(`[Functions]: Loaded ${file}`);
            } catch (error) {
                console.error(`Error loading function ${file}:`, error);
            }
        }
    }
}

async function initializeBot() {
    await loadFunctions();

    client.handleCommands();
    client.handleEvents();
    client.handleComponents();

    client.login(TOKEN).catch((error) => {
        console.error("Error logging in:", error);
    });
}

initializeBot();
