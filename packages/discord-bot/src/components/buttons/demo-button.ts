import { MessageFlags } from "discord.js";
import type { ComponentHandler } from "../../types.js";

const demoButtonHandler: ComponentHandler = {
  customId: "components-demo:button",
  async execute(interaction) {
    await interaction.reply({
      content: "Le bouton fonctionne.",
      flags: MessageFlags.Ephemeral,
    });
  },
};

export default demoButtonHandler;
