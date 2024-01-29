import { Client, Events } from 'discord.js'
import { DiscordEvent } from '@bot/interfaces/discordEvent'

export class ReadyEvent extends DiscordEvent {
	constructor() {
		super('once', Events.ClientReady, async (client: Client) => {
			console.log(`> [bot] ${client!.user!.tag}`)
		})
	}
}
export const event = new ReadyEvent() 
