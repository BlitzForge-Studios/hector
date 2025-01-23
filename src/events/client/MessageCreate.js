import { Events } from "discord.js";
import { handleUserMessage } from "../../shortcuts/database.js";

const COOLDOWN_TIME = 30000;
const EXP_PER_MESSAGE = 10;

const ROLE_MAP = {
    5: "1307378199746842695",
    10: "1307378319704199218",
    15: "1307378351887089817",
    20: "1307378397906997380",
    30: "1307378436238606396",
    40: "1307378484527501312",
    50: "1307378534700028015",
};

async function assignRole(userId, roleId, guild) {
    const member = await guild.members.fetch(userId);
    if (member) {
        await member.roles.add(roleId);
        console.log(`Assigned role ${roleId} to user ${userId}`);
    }
}

export default {
    name: Events.MessageCreate,
    once: false,
    execute: async (message) => {
        if (message.author.bot || !message.guild) return;

        const userId = message.author.id;
        const username = message.author.username;

        const result = await handleUserMessage(
            userId,
            username,
            EXP_PER_MESSAGE,
            COOLDOWN_TIME,
            async (userId, roleId) => {
                await assignRole(userId, roleId, message.guild);
            },
            ROLE_MAP
        );

        if (result.success && result.leveledUp) {
            console.log(
                `${username} has leveled up to level ${result.currentLevel}!`
            );
        }
    },
};
