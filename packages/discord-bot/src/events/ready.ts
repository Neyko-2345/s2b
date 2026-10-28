import { Events } from "discord.js";
import type { Client } from "discord.js";

const readyEvent = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client<true>) {
    console.info(`Bot connecté en tant que ${client.user.tag}.`);
  },
};

export default readyEvent;
