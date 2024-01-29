import { Client, Events, GatewayIntentBits } from 'discord.js'
import { env } from './config'

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, readyClient => {
	console.log(`> [bot] ${readyClient.user.tag}`)
})

client.login(env['DISCORD_BOT_TOKEN'])
