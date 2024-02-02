import { SlashCommandBuilder, CommandInteraction } from 'discord.js'
import { DiscordCommand } from '@bot/interfaces/discordCommand'

export const command: DiscordCommand = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Replies with Pong!'),
	async execute(interaction: CommandInteraction) {
		await interaction.reply('Pong!')
	}
}

