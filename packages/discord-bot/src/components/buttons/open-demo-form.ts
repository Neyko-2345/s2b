import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import type { ComponentHandler } from "../../types.js";

const openDemoFormHandler: ComponentHandler = {
  customId: "components-demo:open-form",
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("components-demo:form")
      .setTitle("Formulaire de démonstration")
      .addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          new TextInputBuilder()
            .setCustomId("message")
            .setLabel("Ton message")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setMaxLength(100),
        ),
      );

    await interaction.showModal(modal);
  },
};

export default openDemoFormHandler;
