import { MessageFlags } from "discord.js";

export default {
  customId: "components-demo:form",
  async execute(interaction) {
    const message = interaction.fields.getTextInputValue("message");
    await interaction.reply({
      content: `Formulaire reçu : ${message}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
