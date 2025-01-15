export default {
    data: {
        customId: "modal",
    },
    execute: async ({ interaction, client }) => {
        // Getting Modal's Input Value (specific one)
        const modalTitle = interaction.fields.getTextInputValue("modal-title");

        return interaction.reply({
            content: `${client.ws.ping} - ${modalTitle}`,
        });
    },
};
