import { fileURLToPath } from "node:url";
import { join } from "node:path";
import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  MessageFlags,
} from "discord.js";
import type { ClientEvents } from "discord.js";
import { loadModules } from "./lib/load-modules.js";
import type {
  BotClient,
  BotEvent,
  ComponentHandler,
  ModalHandler,
  SlashCommand,
} from "./types.js";

const token = process.env.DISCORD_TOKEN;
if (!token) {
  throw new Error(
    "DISCORD_TOKEN est manquant. Ajoute-le dans les secrets Replit ou dans packages/discord-bot/.env.",
  );
}

const sourceDirectory = fileURLToPath(new URL(".", import.meta.url));
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
}) as BotClient;

client.commands = new Collection<string, SlashCommand>();
client.components = new Collection<string, ComponentHandler>();
client.modals = new Collection<string, ModalHandler>();

const commands = await loadModules<SlashCommand>(
  join(sourceDirectory, "commands"),
);
const buttons = await loadModules<ComponentHandler>(
  join(sourceDirectory, "components", "buttons"),
);
const selects = await loadModules<ComponentHandler>(
  join(sourceDirectory, "components", "selects"),
);
const modals = await loadModules<ModalHandler>(
  join(sourceDirectory, "components", "modals"),
);
const events = await loadModules<BotEvent>(
  join(sourceDirectory, "events"),
);

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
  const listener = (...args: unknown[]) => {
    void Promise.resolve(event.execute(...args)).catch((error: unknown) => {
      console.error(`Erreur dans l'événement ${String(event.name)} :`, error);
    });
  };

  const eventName = event.name as keyof ClientEvents;
  if (event.once) {
    client.once(eventName, listener as never);
  } else {
    client.on(eventName, listener as never);
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
      flags: MessageFlags.Ephemeral as const,
    };

    if (interaction.isRepliable()) {
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(errorMessage).catch((followUpError) => {
          console.error("Impossible d'envoyer le message d'erreur :", followUpError);
        });
      } else {
        await interaction.reply(errorMessage).catch((replyError) => {
          console.error("Impossible d'envoyer le message d'erreur :", replyError);
        });
      }
    }
  }
});

client.on(Events.Error, (error) => {
  console.error("Erreur du client Discord :", error);
});

await client.login(token);
