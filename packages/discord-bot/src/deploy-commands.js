import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { REST, Routes } from "discord.js";
import { loadModules } from "./lib/load-modules.js";

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;

if (!token || !clientId) {
  throw new Error(
    "DISCORD_TOKEN et DISCORD_CLIENT_ID sont requis pour publier les commandes.",
  );
}

const sourceDirectory = fileURLToPath(new URL(".", import.meta.url));
const commands = await loadModules(join(sourceDirectory, "commands"));
const payload = commands.map((command) => command.data.toJSON());
const rest = new REST({ version: "10" }).setToken(token);
const route = guildId
  ? Routes.applicationGuildCommands(clientId, guildId)
  : Routes.applicationCommands(clientId);

await rest.put(route, { body: payload });

const scope = guildId ? `le serveur ${guildId}` : "tous les serveurs";
console.info(`${payload.length} commande(s) publiée(s) sur ${scope}.`);
