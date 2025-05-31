import Fastify from "fastify";
import { fastifyCors } from "@fastify/cors";
import nodemailer from "nodemailer";
import { object, string } from "zod";
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
import { Interactions, resend } from "../constants";
import {
  appURL,
  discordApplicationId,
  discordToken,
  mailPassword,
  mailUsername,
} from "../env";

async function main() {
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

  const fastify = Fastify({
    logger: true,
    ignoreTrailingSlash: true,
  });

  fastify.register(fastifyCors, {
    origin: "*",
  });

  fastify.post("/mail/sendmail", async function (request, reply) {
    const schema = object({
      message: string(),
      title: string(),
      to: string().email(),
    });

    return schema.parseAsync(request.body).then(async (body) => {
      return resend.emails.send({
        from: "alert@memesol.store",
        to: body.to,
        subject: body.title,
        html: body.message,
      });
    });
  });

  const tasks = [
    client.login(discordToken),
    fastify.listen({ port: Number(process.env.PORT), host: process.env.HOST! }),
  ];

  const close = () => {
    client.destroy();
    fastify.close();
  };

  process.on("SIGINT", close);
  process.on("SIGTERM", close);
  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
  });
  process.on("uncaughtException", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
  });

  return Promise.all(tasks);
}

main();
