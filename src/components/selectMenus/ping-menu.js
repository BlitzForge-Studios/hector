export default {
    data: {
        customId: "menu",
    },
    execute: async ({ interaction }) => {
        // Setting options on value variable
        let value = interaction.values[0];

        switch (value) {
            case "primary":
                await interaction.reply({
                    content: "This was primary option.",
                });
                break;
            case "secondary":
                await interaction.reply({
                    content: "This was secondary option.",
                });
                break;
            default:
                break;
        }
    },
};
