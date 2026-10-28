import type {
  ChatInputCommandInteraction,
  Client,
  ClientEvents,
  Collection,
  MessageComponentInteraction,
  ModalSubmitInteraction,
  SlashCommandBuilder,
} from "discord.js";

export interface SlashCommand {
  data: SlashCommandBuilder;
  execute(
    interaction: ChatInputCommandInteraction,
    client: Client,
  ): Promise<void>;
}

export interface ComponentHandler {
  customId: string;
  execute(
    interaction: MessageComponentInteraction,
    client: Client,
  ): Promise<void>;
}

export interface ModalHandler {
  customId: string;
  execute(interaction: ModalSubmitInteraction, client: Client): Promise<void>;
}

export interface BotEvent {
  name: keyof ClientEvents;
  once?: boolean;
  execute: (...args: any[]) => void | Promise<void>;
}

export type BotClient = Client & {
  commands: Collection<string, SlashCommand>;
  components: Collection<string, ComponentHandler>;
  modals: Collection<string, ModalHandler>;
};
