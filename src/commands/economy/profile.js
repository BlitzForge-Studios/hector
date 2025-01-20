import { SlashCommandBuilder, EmbedBuilder, bold } from "discord.js";
import { coins, experience } from "../../shortcuts/emojis.js";
import { getUserBalance } from "../../shortcuts/database.js";
import { EMBED_COLOR } from "../../../config.js";

export default {
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("View your profile or someone else's profile")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to view the profile of")
                .setRequired(false)
        ),
    execute: async ({ interaction }) => {
        const targetUser =
            interaction.options.getUser("user") || interaction.user;
        const targetMember = interaction.guild.members.cache.get(targetUser.id);
        const balance = await getUserBalance(targetUser.id);

        const embed = new EmbedBuilder()
            .setTitle("Profile")
            .setDescription(
                targetUser.id === interaction.user.id
                    ? `${interaction.member.displayName}, let's check out your profile.`
                    : `You are viewing ${targetMember.displayName}'s profile.`
            )
            .addFields(
                {
                    name: "Coins",
                    value: `${coins} ${balance} coins`,
                    inline: true,
                },
                {
                    name: "Gems",
                    value: "0 gems",
                    inline: true,
                },
                {
                    name: "\u200b",
                    value: "\u200b",
                    inline: true,
                },
                {
                    name: "Experience",
                    value: `${experience} ??? / ??? exp`,
                    inline: true,
                },
                {
                    name: "Level",
                    value: `**1**/50`,
                    inline: true,
                },
                {
                    name: "\u200b",
                    value: "\u200b",
                    inline: true,
                }
            )
            .setColor(EMBED_COLOR)
            .setThumbnail(targetUser.displayAvatarURL());

        await interaction.reply({ embeds: [embed] });
    },
};
