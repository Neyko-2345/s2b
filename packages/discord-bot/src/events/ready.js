import { Events } from "discord.js";

export default {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.info(`Bot connecté en tant que ${client.user.tag}.`);
  },
};
