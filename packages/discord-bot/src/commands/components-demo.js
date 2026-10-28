import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ContainerBuilder,
  MessageFlags,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  TextDisplayBuilder,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("components-demo")
    .setDescription("Affiche un exemple de composants Discord interactifs."),
  async execute(interaction) {
    const container = new ContainerBuilder()
      .setAccentColor(0x5865f2)
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(
          "## Démonstration des composants\n" +
            "Ce message utilise les Components V2 de Discord.",
        ),
      )
      .addActionRowComponents(
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("components-demo:button")
            .setLabel("Tester le bouton")
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId("components-demo:open-form")
            .setLabel("Ouvrir un formulaire")
            .setStyle(ButtonStyle.Secondary),
        ),
      )
      .addActionRowComponents(
        new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("components-demo:select")
            .setPlaceholder("Choisir une option")
            .addOptions(
              { label: "Option A", value: "a" },
              { label: "Option B", value: "b" },
            ),
        ),
      );

    await interaction.reply({
      components: [container],
      flags: MessageFlags.IsComponentsV2,
    });
  },
};
