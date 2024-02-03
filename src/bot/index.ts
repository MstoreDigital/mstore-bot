import { registerEvents, registerCommands } from '@bot/handlers'
import { clientOptions, mstore } from '@bot/constants'
import { Client, Collection } from 'discord.js'
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
		console.log('> [bot] Bot starting discord login...')
		await this.client.login(env['DISCORD_BOT_TOKEN'])
		await this.client.application?.commands.set(commands, mstore['GUILD_ID'])
		console.log(`> [bot] Registered ${commands.length} commands with success in the API!`)
		return this
	}

	async stop() {
		await this.client.destroy()
	}
}
