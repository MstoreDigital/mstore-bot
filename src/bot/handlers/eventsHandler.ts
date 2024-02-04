import { readRecursive } from '@utils'
import { DiscordEvent } from '@bot/interfaces/discordEvent'
import { Client } from 'discord.js'
import { join } from 'path'

export const registerEvents = async (client: Client) => {
	await readRecursive(join(__dirname, '../events'), async (file: string) => {
		const { event } = await import(file) as { event: DiscordEvent }
		if (!event) {
			return console.log(`> [bot] Don't exists an event constant exported in the file: ${file}`)
		}
		console.log(`> [bot] Registered an ${event.type} event -> ${event.name}`)
		client[event.type](event.name as any, (...args: any) => event.execute(...args))
	})
}
