import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { getLastClaimed, giveDailyReward } from "../../shortcuts/database.js";

export default {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Claim your daily reward!")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async ({ interaction }) => {
        const userId = interaction.user.id;
        const lastClaimed = await getLastClaimed(userId);
        const now = Date.now();

        if (lastClaimed && now - lastClaimed < 24 * 60 * 60 * 1000) {
            const timeLeft = 24 * 60 * 60 * 1000 - (now - lastClaimed);
            const timestamp = Math.floor((now + timeLeft) / 1000);

            await interaction.reply(
                `You can claim your next daily reward at <t:${timestamp}:R>.`
            );
        } else {
            await giveDailyReward(userId);
            await interaction.reply("You have claimed your daily reward!");
        }
    },
};
