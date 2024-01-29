import { registerEvents, registerCommands } from '@bot/handlers'
import { Client, Collection } from 'discord.js'
import { clientOptions } from '@bot/constants/clientOptions'
import { singleton } from 'tsyringe'
import { env } from '@config'

@singleton()
export class Bot {
	private client: Client
	constructor() {
		this.client = new Client(clientOptions)
		this.client.commands = new Collection()
	}

	async start() {
		await registerEvents(this.client)
		const commands = await registerCommands(this.client)
		await this.client.login(env['DISCORD_BOT_TOKEN'])
		await this.client.application?.commands.set(commands)
		console.log(`> [bot] registered ${commands.length} commands with success`)
		return this
	}
}
