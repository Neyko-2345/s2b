import { MessageFlags } from "discord.js";
import type { ComponentHandler } from "../../types.js";

const demoSelectHandler: ComponentHandler = {
  customId: "components-demo:select",
  async execute(interaction) {
    if (!interaction.isStringSelectMenu()) return;

    await interaction.reply({
      content: `Option choisie : ${interaction.values[0]}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};

export default demoSelectHandler;
