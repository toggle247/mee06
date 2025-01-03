import path from "path";
import { readdirSync } from "fs";
import { Collection, Interaction, SlashCommandBuilder } from "discord.js";

export const buildCommands = () => {
  const collection = new Collection<
    string,
    {
      data: SlashCommandBuilder;
      execute: (interaction: Interaction) => Promise<void>;
    }
  >();
  const commands: ReturnType<SlashCommandBuilder["toJSON"]>[] = [];

  const folder = path.join(__dirname, "commands");
  const files = readdirSync(folder);
  for (const file of files) {
    const importPath = path.join(folder, file);
    const command = require(importPath).default;
    if ("data" in command && "execute" in command) {
      collection.set(command.data.name, command);
      commands.push(command.data.toJSON());
    }
  }

  return [collection, commands] as const;
};
