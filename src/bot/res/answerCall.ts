import { DiscordButtonResponse } from '@bot/res'

export const answerCall: DiscordButtonResponse = async ({ message, guild, user }) => {
	const threadName = message.content.split(': ')[1]
	const activeThreads = await guild?.channels.fetchActiveThreads()
	const thread = activeThreads?.threads.find(thread => thread.name === threadName)
	await thread?.members.add(user)
	await thread?.send(`<@${user.id}>`)
	await message.delete()
}
