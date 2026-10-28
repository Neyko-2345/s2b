import { MessageFlags } from "discord.js";

export default {
  customId: "components-demo:button",
  async execute(interaction) {
    await interaction.reply({
      content: "Le bouton fonctionne.",
      flags: MessageFlags.Ephemeral,
    });
  },
};
