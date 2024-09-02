import { SlashCommandBuilder, CommandInteraction, Locale } from 'discord.js'
import { DiscordCommand } from '@bot/interfaces/discordCommand'
import { translations } from '@bot/translations'

export const command: DiscordCommand = {
	data: new SlashCommandBuilder()
		.setName('giveUp')
		.setDescription('Replies with Pong!'),
	async execute(interaction: CommandInteraction) {
		const channel = interaction.channel
		const channelTypeID = channel?.type
    const userLanguage: Locale = interaction.locale

		let selectedLanguage: Locale = userLanguage

    if (userLanguage !== Locale.PortugueseBR && userLanguage !== Locale.EnglishUS) {
			selectedLanguage = Locale.PortugueseBR
		}

    const translate = translations[selectedLanguage as keyof typeof translations]['utils']['close']

		if (!channel || channelTypeID !== 12) {
			await interaction.reply({ content: translate['channelTypeInvalid'], ephemeral: true })
			return
		}
	}
}
