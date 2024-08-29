import { SlashCommandBuilder, CommandInteraction, TextChannel, Locale } from 'discord.js'
import { DiscordCommand } from '@bot/interfaces/discordCommand'
import { translations } from '@bot/translations'

export const command: DiscordCommand = {
	data: new SlashCommandBuilder()
		.setName('close')
		.setDescription('Close the ticket and provide a reason')
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Reason for closing the ticket')
				.setRequired(true)),
	async execute(interaction: CommandInteraction) {
		const channel = interaction.channel
		const channelTypeID = channel?.type
		const reason = interaction.options.get('reason', true)?.value as string
		const mStoreId = '1201322920253857902'
		const userWhoClosed = interaction.user.id
		const userLanguage: Locale = interaction.locale

		let selectedLanguage: Locale = userLanguage
		let moderatorId: string | null = null

		if (userLanguage !== Locale.PortugueseBR && userLanguage !== Locale.EnglishUS) {
			selectedLanguage = Locale.PortugueseBR
		}

		const translate = translations[selectedLanguage as keyof typeof translations]['utils']['close']

		if (!channel || channelTypeID !== 12) {
			await interaction.reply({ content: translate['channelTypeInvalid'], ephemeral: true })
			return
		}

		const userToHelpId = channel.name.split('-')[1]
		const messages = await channel.messages.fetch({ limit: 15 })

		for (const message of messages.values()) {
			if (message.author.id !== userToHelpId && message.author.id !== mStoreId) {
				moderatorId = message.author.id
				break
			}
		}

		const supportHistoryChannelId = '1272975836110127157'
		const supportHistoryChannel = interaction.guild?.channels.cache.get(supportHistoryChannelId) as TextChannel
		const supportDate = new Date(interaction.createdAt).toLocaleString(selectedLanguage)
		const supportHistoryMessage = translate['historyMessage']
			.replace('{id}', channel.id)
			.replace('{channelName}', channel.name)
			.replace('{createdAt}', supportDate)
			.replace('{username}', `<@${userToHelpId}>`)
			.replace('{moderatorName}', moderatorId ? `<@${moderatorId}>` : translate['moderatorUnknown'])
			.replace('{reason}', reason)
			.replace('{closedBy}', `<@${userWhoClosed}>`)

		await supportHistoryChannel.send(supportHistoryMessage)

		await interaction.reply({ content: translate['ticketClosed'], ephemeral: true })

		setTimeout(async () => {
			await channel.delete()
		}, 5000)
	}
}