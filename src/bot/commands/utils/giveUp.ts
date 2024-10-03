import { SlashCommandBuilder, CommandInteraction, Locale, GuildMember, TextChannel, ButtonBuilder, ActionRowBuilder, ButtonStyle, PrivateThreadChannel } from 'discord.js'
import { DiscordCommand } from '@bot/interfaces/discordCommand'
import { translations } from '@bot/translations'
import { mstore } from '@bot/constants'

export const command: DiscordCommand = {
	data: new SlashCommandBuilder()
		.setName('give-up')
		.setDescription('Gives up on the support and reopens the ticket.')
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Reason for giving up on the support')
				.setRequired(true)),
	async execute(interaction: CommandInteraction) {
		const channel = interaction.channel as PrivateThreadChannel | null
		const channelTypeID = channel?.type
		const userLanguage: Locale = interaction.locale
		const user = interaction.member as GuildMember | null
		const reason = interaction.options.get('reason', true)?.value as string

		let selectedLanguage: Locale = userLanguage

		if (userLanguage !== Locale.PortugueseBR && userLanguage !== Locale.EnglishUS) {
			selectedLanguage = Locale.PortugueseBR
		}

		const translate = translations[selectedLanguage as keyof typeof translations]['utils']['giveUp']
		const translateLabel = translations[selectedLanguage as keyof typeof translations]['utils']['thread']['callSupport']

		if (!channel || channelTypeID !== 12) {
			await interaction.reply({ content: translate['channelTypeInvalid'], ephemeral: true })
			return
		}

		const userToHelpId = channel.name.split('-')[1]

		if (!user || interaction.user.id === userToHelpId) {
			await interaction.reply({ content: translate['userUnauthorized'], ephemeral: true })
			return
		}

		try {
			await channel.members.remove(user.id)
			await interaction.reply({ content: translate['successMessage'].replace('{moderator}', `<@${user.id}>`) })
		} catch (error) {
			console.error(translate['removeFailed'], error)
			await interaction.reply({ content: translate['removeFailed'], ephemeral: true })
			return
		}

		const messages = await channel.messages.fetch({cache: false})
		const userMessages = messages.filter(message => message.author.id === userToHelpId)
		const [problemDescription, problemType, product] = userMessages.last(3)

		const supportHistoryChannelId = '1272975836110127157'
		const supportHistoryChannel = interaction.guild?.channels.cache.get(supportHistoryChannelId) as TextChannel
		const supportDate = new Date(interaction.createdAt).toLocaleString(selectedLanguage)
		const supportGiveUpMessage = translate['giveUpMessage']
			.replace('{id}', channel.id)
			.replace('{channelName}', channel.name)
			.replace('{createdAt}', supportDate)
			.replace('{username}', `<@${userToHelpId}>`)
			.replace('{reason}', reason)
			.replace('{UserWhoGaveUp}', `<@${user.id}>`)

		await supportHistoryChannel.send(supportGiveUpMessage)

		const answerCallButton = new ButtonBuilder()
			.setCustomId('answer_call')
			.setLabel(translateLabel['answerCallLabel'])
			.setStyle(ButtonStyle.Primary)
		const row = new ActionRowBuilder<ButtonBuilder>().addComponents(answerCallButton)
		const answerCallChannel = interaction.guild?.channels.cache.get(mstore['ANSWER_CHANNEL_CALL_ID']) as TextChannel
		const reopenMessage = translate['supportMessage']
			.replace('{userId}', userToHelpId)
			.replace('{language}', selectedLanguage)
			.replace('{product}', product.content)
			.replace('{problemType}', problemType.content)
			.replace('{problemDescription}', problemDescription.content)

		await answerCallChannel.send({ content: reopenMessage, components: [row] })
	}
}