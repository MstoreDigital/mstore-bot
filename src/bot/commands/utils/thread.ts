import { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import { DiscordCommand } from '@bot/interfaces/discordCommand'
import { translations } from '@bot/translations'

export const command: DiscordCommand = {
	data: new SlashCommandBuilder()
		.setName('thread')
		.setDescription('Create a message with a button, when an user click on the button generate a private thread')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
		.addStringOption(option => option
			.setName('type')
			.setDescription('The type of the thread that will be created')
			.setRequired(true)
			.addChoices(
				{ name: 'help', value: 'help' },
				{ name: 'partner', value: 'partner' },
				{ name: 'job', value: 'job' }
			))
		.addStringOption(option => option
			.setName('lang')
			.setDescription('The lang of the channel')
			.setRequired(true)
			.addChoices(
				{ name: 'pt-BR', value: 'pt-BR' },
				{ name: 'en-US', value: 'en-US' }
			)),
	async execute(interaction: CommandInteraction) {
		const option = interaction.options.get('type', true).value
		const lang = interaction.options.get('lang', true).value
		const translate = translations[lang as keyof typeof translations]['utils']['thread']

		const options = {
			'help': async () => {				
				const callSupportButton = new ButtonBuilder()
					.setCustomId('call_support')
					.setLabel(translate['btnLabel'])
					.setStyle(ButtonStyle.Primary)
				
				const row = new ActionRowBuilder<ButtonBuilder>().addComponents(callSupportButton)
				
				interaction.reply({
					content: translate['content'],
					components: [row]
				})
			},
			'partner': async () => {},
			'job': async () => {}
		}
		options[option as keyof typeof options]()
	}
}
