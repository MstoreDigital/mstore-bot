import { Client, Events } from 'discord.js'
import { clientOptions } from '@bot/constants/clientOptions'
import { singleton } from 'tsyringe'
import { env } from '@config'

@singleton()
export class Bot {
	private client
	constructor() {
		this.client = new Client(clientOptions)
		this.client.once(Events.ClientReady, readyClient => {
			console.log(`> [bot] ${readyClient.user.tag}`)
		})
	}

	start() {
		this.client.login(env['DISCORD_BOT_TOKEN'])
	}
}
