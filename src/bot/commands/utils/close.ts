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
			await interaction.reply(translate['channelTypeInvalid'])
			return
		}

		await interaction.reply('Por favor, informe o motivo do encerramento do ticket:')

		const filter = (response: any) => response.author.id === interaction.user.id;
		const collector = new MessageCollector(channel, { filter, max: 1, time: 60000 })

		collector.on('collect', async (message) => {
			const reason = message.content
			const supportHistoryChannelId = '1272975836110127157'
			const supportHistoryChannel = interaction.guild?.channels.cache.get(supportHistoryChannelId) as TextChannel
			const supportHistoryMessage = `
				**Ticket ID:** ${channel.id}
				**Data do atendimento:** ${interaction.createdAt}
				**Usuário:** ${interaction.user.username} (ID: ${interaction.user.id})
				**Moderador Responsável:** ${interaction.user.tag} (ID: ${interaction.user.id})
				**Motivo de Encerramento:** ${reason}
			`

			if (supportHistoryChannel) {
				await supportHistoryChannel.send(supportHistoryMessage)
			} else {
				await interaction.followUp('Não foi possível encontrar o canal de histórico.')
			}

			await channel.delete('Ticket fechado pelo comando /close')
		})

		collector.on('end', collected => {
			if (collected.size === 0) {
				interaction.followUp('Você não forneceu um motivo para o encerramento do ticket. O canal não será fechado.')
			}
		})
  }
}