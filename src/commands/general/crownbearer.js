import {
    ButtonBuilder,
    ButtonStyle,
    SlashCommandBuilder,
    ActionRowBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
} from "discord.js";
import { balanced } from "../../shortcuts/emojis.js";

export default {
    data: new SlashCommandBuilder()
        .setName("crownbearer")
        .setDescription(
            "Claim a special role! Only one person can hold this role at a time."
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    execute: async ({ interaction }) => {
        await interaction.deferReply();

        const embed = new EmbedBuilder()
            .setTitle("Information About Crownbearer")
            .setDescription(
                "Crownbearer is a role that grants you rich permissions. It ıs always obtainable with a short cooldown!\nWhat are you waiting for? Claim it now!"
            )
            .setColor(0xffe45d);

        const button = new ButtonBuilder()
            .setCustomId("claimCrownbearer")
            .setLabel("Become Crownbearer!")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji(balanced);

        const row = new ActionRowBuilder().addComponents(button);

        await interaction.followUp({
            content: "> Click the button to claim <@&1303809293677625415>!",
            embeds: [embed],
            components: [row],
        });
    },
};
