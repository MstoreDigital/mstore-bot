import { Events, GuildMember } from 'discord.js'
import { DiscordEvent } from '@bot/interfaces/discordEvent'
import { mstore } from '@bot/constants'

export const event: DiscordEvent = {
	type: 'on',
	name: Events.GuildMemberUpdate,
	execute: async (oldMember: GuildMember, newMember: GuildMember) => {
		if (oldMember.guild.id !== mstore['GUILD_ID']) return
		if (oldMember.roles.cache.get(mstore['LANGUAGES_ROLE_ID'])) return
		const languages = Object.keys(mstore['LANGUAGES'])
		const lang = languages.filter(lang => newMember.roles.cache.some(role => role.name.includes(lang)))[0]
		console.log(lang)
	}
}
