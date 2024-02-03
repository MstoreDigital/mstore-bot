import { DiscordEvent } from '@bot/interfaces/discordEvent'
import { Events } from 'discord.js'

export const event: DiscordEvent = {
	type: 'once',
	name: Events.ClientReady,
	execute: async () => {
		console.log('> [bot] The bot successfully logged in!')
	}
}
