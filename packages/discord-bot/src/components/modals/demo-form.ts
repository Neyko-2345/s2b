import { MessageFlags } from "discord.js";
import type { ModalHandler } from "../../types.js";

const demoFormHandler: ModalHandler = {
  customId: "components-demo:form",
  async execute(interaction) {
    const message = interaction.fields.getTextInputValue("message");
    await interaction.reply({
      content: `Formulaire reçu : ${message}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};

export default demoFormHandler;
