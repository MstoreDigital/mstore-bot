import { ActionRowBuilder, ButtonBuilder, ChannelType, ForumChannel, MediaChannel, TextChannel, ButtonStyle } from 'discord.js'
import { DiscordButtonResponse } from '@bot/res'
import { mstore } from '@bot/constants'

export const callSupport: DiscordButtonResponse = async ({ user, guild, channelId }) => {
	const channel = guild?.channels.cache.get(channelId) as ForumChannel | MediaChannel
	const thread = await channel.threads.create({
		name: `help-${user.id}`,
		autoArchiveDuration: 60,
		type: ChannelType.PrivateThread
	} as any)
	thread?.members.add(user)
	thread?.send(`<@${user.id}>`)

	const answerCall = guild?.channels.cache.get(mstore['ANSWER_CHANNEL_CALL_ID']) as TextChannel
	const answerCallButton = new ButtonBuilder()
		.setCustomId('answer_call')
		.setLabel('Answer call')
		.setStyle(ButtonStyle.Primary)

	const row = new ActionRowBuilder<ButtonBuilder>().addComponents(answerCallButton)

	answerCall.send({
		content: `New call: help-${user.id}`,
		components: [row]
	})
}
