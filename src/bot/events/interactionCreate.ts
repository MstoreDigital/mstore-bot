import { DiscordEvent } from '@bot/interfaces/discordEvent'
import { ButtonInteraction, ChatInputCommandInteraction, Events, Interaction } from 'discord.js'

class InteractionCreateEvent extends DiscordEvent {
	constructor() {
		super('on', Events.InteractionCreate, async (interaction: Interaction) => {
			if(interaction.user.bot) return
			if(interaction.isChatInputCommand()) {
				this.chatInputCommandExecute(interaction)
			} else if(interaction.isButton()) {
				this.buttonInteractionExecute(interaction)
			}
		})
	}
	private async chatInputCommandExecute(interaction: ChatInputCommandInteraction) {
		const command = interaction.client.commands.get(interaction.commandName)
		if (!command) return
		try {
			await command.execute(interaction)
		} catch(error: any) {
			await interaction.reply({ content: 'error in command execution', ephemeral: true })
		}
	}
	private buttonInteractionExecute(interaction: ButtonInteraction) {
		console.log(interaction)
	}
}
export const event = new InteractionCreateEvent()
