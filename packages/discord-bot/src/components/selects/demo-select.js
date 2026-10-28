import { MessageFlags } from "discord.js";

export default {
  customId: "components-demo:select",
  async execute(interaction) {
    if (!interaction.isStringSelectMenu()) return;

    await interaction.reply({
      content: `Option choisie : ${interaction.values[0]}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
