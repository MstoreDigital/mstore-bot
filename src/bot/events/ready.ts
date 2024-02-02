import { Client, Events } from 'discord.js'
import { DiscordEvent } from '@bot/interfaces/discordEvent'

export const event: DiscordEvent = {
	type: 'once',
	name: Events.ClientReady,
	execute: async (client: Client) => {
		console.log(`> [bot] ${client!.user!.tag}`)
	}
}
