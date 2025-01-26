import { MessageFlags } from "discord.js";

const roleID = "1303809293677625415";
const cooldown = new Map();

export default {
    data: {
        customId: "claimCrownbearer",
    },
    execute: async ({ interaction }) => {
        const { user, guild } = interaction;
        const member = await guild.members.fetch(user.id);
        const role = guild.roles.cache.get(roleID);

        const lastUsed = cooldown.get(user.id);
        const now = Date.now();
        if (lastUsed && now - lastUsed < 10 * 60 * 1000) {
            const remainingTime = Math.ceil(
                (10 * 60 * 1000 - (now - lastUsed)) / 1000
            );
            return interaction.reply({
                content: `You must wait ${remainingTime} seconds before claiming the role again.`,
                flags: MessageFlags.Ephemeral,
            });
        }

        const currentHolder = guild.members.cache.find((member) =>
            member.roles.cache.has(roleID)
        );

        if (currentHolder) {
            await currentHolder.roles.remove(role);
        }

        await member.roles.add(role);

        cooldown.set(user.id, now);

        return interaction.reply({
            content: "You are now Crownbearer. Hold it tight!",
            flags: MessageFlags.Ephemeral,
        });
    },
};
