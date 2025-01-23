import fs from "fs";
import path from "path";

const dataPath = path.resolve("data");

if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath);
}

function initializeUserData() {
    return {
        username: null,
        lastClaimed: null,
        balance: 0,
        exp: 0,
        lastExpTime: 0,
    };
}

export function getUserData(userId) {
    const filePath = path.resolve(dataPath, `${userId}.json`);
    if (!fs.existsSync(filePath)) {
        return initializeUserData();
    }
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function saveUserData(userId, data) {
    const filePath = path.resolve(dataPath, `${userId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function getLastClaimed(userId) {
    const userData = getUserData(userId);
    return userData.lastClaimed;
}

export async function giveDailyReward(userId) {
    const now = Date.now();
    const userData = getUserData(userId);

    userData.lastClaimed = now;
    userData.balance += 1000;
    userData.exp += 500;

    saveUserData(userId, userData);
    return { balance: userData.balance, exp: userData.exp };
}

export async function getUserBalance(userId) {
    const userData = getUserData(userId);
    return userData.balance;
}

export async function getUserExp(userId) {
    const userData = getUserData(userId);
    return userData.exp;
}

export async function addExpOnMessage(
    userId,
    username,
    expToAdd = 10,
    cooldownTime = 30000
) {
    const userData = getUserData(userId);

    if (!userData.username || userData.username !== username) {
        userData.username = username;
    }

    const now = Date.now();
    const lastExpTime = userData.lastExpTime || 0;
    const timeSinceLastExp = now - lastExpTime;

    if (timeSinceLastExp < cooldownTime) {
        return {
            success: false,
            remainingTime: cooldownTime - timeSinceLastExp,
        };
    }

    userData.exp += expToAdd;
    userData.lastExpTime = now;

    saveUserData(userId, userData);
    return { success: true, expAdded: expToAdd, totalExp: userData.exp };
}

export async function handleUserMessage(
    userId,
    username,
    expPerMessage = 10,
    cooldownTime = 30000
) {
    return addExpOnMessage(userId, username, expPerMessage, cooldownTime);
}
