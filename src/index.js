import {
    ActivityType,
    Client,
    Collection,
    GatewayIntentBits,
} from "discord.js";
import fs from "fs";
import { TOKEN } from "../config.js";

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
    presence: {
        status: "online",
        activities: [
            {
                name: "Dungeon Blitz: Remake #gathering",
                type: ActivityType.Playing,
            },
        ],
    },
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync("./src/functions");

for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));

    for (const file of functionFiles) {
        const { default: func } = await import(`./functions/${folder}/${file}`);

        func(client);
    }
}

client.handleCommands();
client.handleEvents();
client.handleComponents();

client.login(TOKEN);
