import { SlashCommandBuilder } from "discord.js";
import type { SlashCommand } from "../types.js";

const pingCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Vérifie que le bot répond."),
  async execute(interaction, client) {
    const latency = Math.round(client.ws.ping);
    await interaction.reply(`Pong ! Latence Discord : ${latency} ms.`);
  },
};

export default pingCommand;
