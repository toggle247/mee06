import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
} from "discord.js";

import { buildCommands } from "./utils";
import { Interactions } from "../constants";
import { appURL, discordApplicationId, discordToken } from "../env";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const rest = new REST().setToken(discordToken);

const [collections, commands] = buildCommands();

client.once(Events.ClientReady, async (client) => {
  console.log("Ready! Logged in as ", client.user.tag);
  await rest.put(Routes.applicationCommands(discordApplicationId), {
    body: commands,
  });
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isStringSelectMenu()) {
    if (interaction.customId === Interactions.TICKET_CATEGORY) {
      const app = new ButtonBuilder()
        .setLabel("Connect")
        .setStyle(ButtonStyle.Link)
        .setURL(appURL);
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(app);
      interaction.update({
        components: [row],
      });
    }
  }

  if (interaction.isChatInputCommand()) {
    const command = collections.get(interaction.commandName);
    if (command) return command.execute(interaction);
  }
});

client.login(discordToken);
