import { ButtonInteraction, ChatInputCommandInteraction, Events, Interaction } from 'discord.js'
import { DiscordEvent } from '@bot/interfaces/discordEvent'
import { responses } from '@bot/res'

export const event: DiscordEvent = {
	type: 'on',
	name: Events.InteractionCreate,
	execute: async (interaction: Interaction) => {
		if(interaction.user.bot) return
		if(interaction.isChatInputCommand()) {
			await chatInputCommandExecute(interaction)
		} else if(interaction.isButton()) {
			await buttonInteractionExecute(interaction)
		}
	},
}
async function chatInputCommandExecute(interaction: ChatInputCommandInteraction) {
	const command = interaction.client.commands.get(interaction.commandName)
	if (!command) return
	try {
		await command.execute(interaction)
	} catch(error: any) {
		await interaction.reply({ content: 'Error in command execution', ephemeral: true })
	}
}
async function buttonInteractionExecute(interaction: ButtonInteraction) {
	await responses[interaction.customId as keyof typeof responses](interaction)
}

