import { Events, GuildMember } from 'discord.js'
import { DiscordEvent } from '@bot/interfaces/discordEvent'
import { mstore } from '@bot/constants'

export const event: DiscordEvent = {
	type: 'on',
	name: Events.GuildMemberAdd,
	execute: async (member: GuildMember) => {
		if (member.guild.id !== mstore['GUILD_ID']) return
		console.log(member)
	}
}
