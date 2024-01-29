import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export interface DiscordCommand {
	data: SlashCommandBuilder
	execute: (interaction: CommandInteraction) => Promise<any>
}
