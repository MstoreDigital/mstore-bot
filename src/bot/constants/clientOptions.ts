import { type Collection, GatewayIntentBits, IntentsBitField, Partials } from 'discord.js'
import type { DiscordCommand } from '@bot/interfaces/discordCommand'

declare module 'discord.js' { export interface Client { commands: Collection<string, DiscordCommand> } }

export const clientOptions = {
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.GuildPresences,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessageReactions,
		GatewayIntentBits.Guilds
	], partials: [ 
		Partials.User,
		Partials.Message,
		Partials.Channel,
		Partials.Reaction
	]
}
