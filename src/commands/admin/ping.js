import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    SlashCommandBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} from "discord.js";

export default {
    data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
    execute: async ({ interaction }) => {
        // This is for building embed
        const embed = new EmbedBuilder()
            .setAuthor({ name: "Author" })
            .setColor(0x010101)
            .setTitle("Title")
            .setDescription("# Description");

        // This is for building button
        const button = new ButtonBuilder()
            .setCustomId("button")
            .setLabel("This is button")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("🫵🏻");

        // This is for building select menu
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId("menu")
            .setDisabled(false)
            .setMaxValues(1)
            .setPlaceholder("UwU")
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel("Yes, I doesn't")
                    .setValue("primary")
                    .setDescription("Sexy description")
                    .setEmoji("🥵")
                    .setDefault(false),
                new StringSelectMenuOptionBuilder()
                    .setLabel("No, he do")
                    .setValue("secondary")
                    .setDescription("Unsexy description")
            );

        const buttonRow = new ActionRowBuilder().addComponents(button);
        const menuRow = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({
            content: "Pong!",
            embeds: [embed],
            components: [buttonRow, menuRow],
        });
    },
};
