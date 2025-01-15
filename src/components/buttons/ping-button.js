import {
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} from "discord.js";

export default {
    data: {
        customId: "button",
    },
    execute: async ({ interaction }) => {
        const modal = new ModalBuilder()
            .setCustomId("modal")
            .setTitle("Modal example");

        const input = new TextInputBuilder()
            .setCustomId("modal-title")
            .setLabel("Yehaww")
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("Dies from cringe")
            .setMinLength(5)
            .setMaxLength(100);
        const firstActionRow = new ActionRowBuilder().addComponents(input);

        modal.addComponents(firstActionRow);

        await interaction.showModal(modal).catch((e) => console.log(e));
    },
};
