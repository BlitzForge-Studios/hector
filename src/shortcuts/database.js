import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.resolve(__dirname, "data");

if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath);
}

export async function getLastClaimed(userId) {
    const filePath = path.resolve(dataPath, `${userId}.json`);
    if (!fs.existsSync(filePath)) {
        return null;
    }
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return data.lastClaimed;
}

export async function giveDailyReward(userId) {
    const filePath = path.resolve(dataPath, `${userId}.json`);
    const now = Date.now();
    let data = { lastClaimed: now, balance: 100 };
    if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        data.lastClaimed = now;
        data.balance += 100;
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function getUserBalance(userId) {
    const filePath = path.join(dataPath, `${userId}.json`);
    if (!fs.existsSync(filePath)) {
        return 0;
    }
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return data.balance || 0;
}
