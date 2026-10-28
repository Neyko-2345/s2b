import { fileURLToPath } from "node:url";
import { join } from "node:path";
import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  MessageFlags,
} from "discord.js";
import { loadModules } from "./lib/load-modules.js";

export async function startDiscordBot() {
  const token = process.env.DISCORD_TOKEN;
  if (!token) {
    console.error(
      "DISCORD_TOKEN est manquant. Le serveur HTTP reste disponible, mais le bot ne se connecte pas.",
    );
    return;
  }

  const sourceDirectory = fileURLToPath(new URL(".", import.meta.url));
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  client.commands = new Collection();
  client.components = new Collection();
  client.modals = new Collection();

  const commands = await loadModules(join(sourceDirectory, "commands"));
  const buttons = await loadModules(
    join(sourceDirectory, "components", "buttons"),
  );
  const selects = await loadModules(
    join(sourceDirectory, "components", "selects"),
  );
  const modals = await loadModules(
    join(sourceDirectory, "components", "modals"),
  );
  const events = await loadModules(join(sourceDirectory, "events"));

  for (const command of commands) {
    client.commands.set(command.data.name, command);
  }
  for (const handler of [...buttons, ...selects]) {
    client.components.set(handler.customId, handler);
  }
  for (const handler of modals) {
    client.modals.set(handler.customId, handler);
  }

  for (const event of events) {
    const listener = (...args) => {
      void Promise.resolve(event.execute(...args)).catch((error) => {
        console.error(`Erreur dans l'événement ${String(event.name)} :`, error);
      });
    };

    if (event.once) {
      client.once(event.name, listener);
    } else {
      client.on(event.name, listener);
    }
  }

  client.on(Events.InteractionCreate, async (interaction) => {
    try {
      if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        await command.execute(interaction, client);
        return;
      }

      if (interaction.isMessageComponent()) {
        const handler = client.components.get(interaction.customId);
        if (!handler) return;
        await handler.execute(interaction, client);
        return;
      }

      if (interaction.isModalSubmit()) {
        const handler = client.modals.get(interaction.customId);
        if (!handler) return;
        await handler.execute(interaction, client);
      }
    } catch (error) {
      console.error("Erreur pendant le traitement d'une interaction :", error);

      const errorMessage = {
        content: "Une erreur est survenue pendant le traitement.",
        flags: MessageFlags.Ephemeral,
      };

      if (interaction.isRepliable()) {
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(errorMessage).catch((followUpError) => {
            console.error(
              "Impossible d'envoyer le message d'erreur :",
              followUpError,
            );
          });
        } else {
          await interaction.reply(errorMessage).catch((replyError) => {
            console.error(
              "Impossible d'envoyer le message d'erreur :",
              replyError,
            );
          });
        }
      }
    }
  });

  client.on(Events.Error, (error) => {
    console.error("Erreur du client Discord :", error);
  });

  await client.login(token);
}
