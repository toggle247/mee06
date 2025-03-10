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
import { Interactions } from "../constants";
import { appURL, discordApplicationId, discordToken, mailPassword, mailUsername } from "../env";

async function main(){
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
    origin: '*'
  });


  fastify.post('/mail/sendmail', async function (request, reply) {
    const schema = object({
      message: string(),
      title: string(),
      to: string().email(),
    });

    return schema.parseAsync(request.body).then(body => {
      console.log(body);
      const transport =  nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
          user: mailUsername,
          pass: mailPassword,
        }
      });
     return transport.sendMail({
        to: body.to,
        subject: body.title,
        text: body.message,
      }, (error, response) => {
        if(error)
          return reply.status(500).send({ message: error });
        return response;
      })
    })
  });

  const tasks = [
    client.login(discordToken),
    fastify.listen({ port: Number(process.env.PORT), host: process.env.HOST! })
  ];

  process.on("SIGINT", () => fastify.close());
  process.on("SIGTERM", () => fastify.close());

  return Promise.all(tasks)
}

main();
