import { Events } from "discord.js";
import { getUserData, saveUserData } from "../../shortcuts/database.js";

const COOLDOWN_TIME = 30000;
const EXP_PER_MESSAGE = 10;

function addExperience(userId, username, experiencePoints) {
    const userData = getUserData(userId);

    if (!userData.username || userData.username !== username) {
        userData.username = username;
    }

    const now = Date.now();
    const lastExpTime = userData.lastExpTime || 0;
    const timeSinceLastExp = now - lastExpTime;

    if (timeSinceLastExp < COOLDOWN_TIME) {
        return {
            success: false,
            remainingTime: COOLDOWN_TIME - timeSinceLastExp,
        };
    }

    userData.exp += experiencePoints;
    userData.lastExpTime = now;

    saveUserData(userId, userData);
    return { success: true };
}

export default {
    name: Events.MessageCreate,
    once: false,
    execute: async (message) => {
        if (message.author.bot) return;

        const userId = message.author.id;
        const username = message.author.username;

        addExperience(userId, username, EXP_PER_MESSAGE);
    },
};
