import { GatewayIntentBits, IntentsBitField, Partials } from 'discord.js'

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
