import {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
} from "discord.js";
import { coins } from "../../shortcuts/emojis.js";
import { getUserBalance } from "../../shortcuts/database.js";

export default {
    data: new SlashCommandBuilder()
        .setName("bag")
        .setDescription("How many coins do you have?")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async ({ interaction }) => {
        const userId = interaction.user.id;
        const balance = await getUserBalance(userId);

        const embed = new EmbedBuilder()
            .setTitle("Your Bag")
            .setDescription(`You have ${coins} ${balance} coins.`)
            .setColor(0xe9ad03);

        await interaction.reply({ embeds: [embed] });
    },
};
