import { Events } from "discord.js";

export default {
    name: Events.ClientReady,
    once: true,
    execute: async (client) => {
        console.log(`[READY] Logged in as ${client.user.tag}!`);
    },
};
