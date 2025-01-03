import {
  ActionRowBuilder,
  EmbedBuilder,
  Message,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
} from "discord.js";
import { categories } from "../../config";
import { Interactions } from "../../constants";

export default {
  data: new SlashCommandBuilder()
    .setName("create")
    .setDescription("Create new ticket"),
  async execute(interaction: Message<boolean>) {
    const embed = new EmbedBuilder()
      .setTitle("Ticket Support")
      .setDescription("Select the category of your issues?")
      .setFooter({ text: "Support Ticketing System" })
      .setColor(0x5865f2);

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId(Interactions.TICKET_CATEGORY)
      .setPlaceholder("Select Category")
      .addOptions(categories);

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      selectMenu
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
