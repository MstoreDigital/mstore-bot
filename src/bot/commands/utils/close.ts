import { SlashCommandBuilder, CommandInteraction, TextChannel, MessageCollector, Locale } from 'discord.js'
import { DiscordCommand } from '@bot/interfaces/discordCommand'
import { translations } from '@bot/translations'

export const command: DiscordCommand = {
	data: new SlashCommandBuilder()
		.setName('close')
		.setDescription('close the ticket'),
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

		await interaction.reply({ content: translate['closureReasonRequestMessage'], ephemeral: true })

		const filter = (response: any) => response.author.id === interaction.user.id;
		const collector = new MessageCollector(channel, { filter, max: 1, time: 60000 })

		collector.on('collect', async (message) => {
			const reason = message.content
			const supportHistoryChannelId = '1272975836110127157'
			const supportDate = interaction.createdAt.toLocaleString(selectedLanguage, {timeZone: 'UTC'})
			const supportHistoryChannel = interaction.guild?.channels.cache.get(supportHistoryChannelId) as TextChannel
			const supportHistoryMessage = translate['historyMessage']
				.replace('{id}', channel.id)
				.replace('{createdAt}', supportDate)
				.replace('{username}', interaction.user.username)
				.replace('{userId}', interaction.user.id)
				.replace('{moderatorId}', interaction.user.id)
				.replace('{userTag}', interaction.user.tag)
				.replace('{reason}', reason)

			if (supportHistoryChannel) {
				await supportHistoryChannel.send(supportHistoryMessage)
			} else {
				await interaction.followUp({ content: translate['channelNotFound'], ephemeral: true })
			}

			await channel.delete()
		})

		collector.on('end', collected => {
			if (collected.size === 0) {
				interaction.followUp({ content: translate['reasonNotProvided'], ephemeral: true })
			}
		})
  }
}