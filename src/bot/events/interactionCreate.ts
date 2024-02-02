import { DiscordEvent } from '@bot/interfaces/discordEvent'
import { ButtonInteraction, ChatInputCommandInteraction, Events, Interaction } from 'discord.js'

export const event: DiscordEvent = {
	type: 'on',
	name: Events.InteractionCreate,
	execute: async (interaction: Interaction) => {
		if(interaction.user.bot) return
		if(interaction.isChatInputCommand()) {
			await chatInputCommandExecute(interaction)
		} else if(interaction.isButton()) {
			buttonInteractionExecute(interaction)
		}
	},
}
async function chatInputCommandExecute(interaction: ChatInputCommandInteraction) {
	const command = interaction.client.commands.get(interaction.commandName)
	if (!command) return
	try {
		await command.execute(interaction)
	} catch(error: any) {
		await interaction.reply({ content: 'error in command execution', ephemeral: true })
	}
}
function buttonInteractionExecute(interaction: ButtonInteraction) {
	console.log(interaction)
}

