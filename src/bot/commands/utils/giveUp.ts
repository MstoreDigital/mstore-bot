import { SlashCommandBuilder, CommandInteraction, Locale, GuildMember, TextChannel } from 'discord.js'
import { DiscordCommand } from '@bot/interfaces/discordCommand'
import { translations } from '@bot/translations'

export const command: DiscordCommand = {
	data: new SlashCommandBuilder()
		.setName('give-up')
		.setDescription('Gives up on the support and reopens the ticket.')
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Reason for giving up on the support')
				.setRequired(true)),
	async execute(interaction: CommandInteraction) {
		const channel = interaction.channel
		const channelTypeID = channel?.type
    const userLanguage: Locale = interaction.locale
		const user = interaction.member as GuildMember | null
		const reason = interaction.options.get('reason', true)?.value as string

		let selectedLanguage: Locale = userLanguage

    if (userLanguage !== Locale.PortugueseBR && userLanguage !== Locale.EnglishUS) {
			selectedLanguage = Locale.PortugueseBR
		}

    const translate = translations[selectedLanguage as keyof typeof translations]['utils']['giveUp']

		if (!channel || channelTypeID !== 12) {
			await interaction.reply({ content: translate['channelTypeInvalid'], ephemeral: true })
			return
		}

		const userToHelpId = channel.name.split('-')[1]

		if (!user) {
			await interaction.reply({ content: translate['userNotFound'], ephemeral: true })
			return
		}

		try {
			await channel.members.remove(user.id)
			await interaction.reply({ content: translate['successMessage'], ephemeral: true })
		} catch (error) {
			console.error(translate['removeFailed'], error)
			await interaction.reply({ content: translate['removeFailed'], ephemeral: true })
		}

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
	}
}
