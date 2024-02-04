import { CommandInteraction, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js'

export interface DiscordCommand {
	data: Partial<SlashCommandBuilder | SlashCommandSubcommandBuilder | SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandGroupBuilder | SlashCommandSubcommandsOnlyBuilder>;
	execute: (interaction: CommandInteraction) => Promise<any>;
}
