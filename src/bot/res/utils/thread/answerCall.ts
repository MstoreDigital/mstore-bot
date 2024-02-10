import { DiscordButtonResponse } from '@bot/res'
import { translations } from '@bot/translations'

export const answerCall: DiscordButtonResponse = async ({ message, guild, user }) => {
	const threadName = message.content.split(': ')[1].split('\n')[0]
	const lang = message.content.split(': `')[1].split('`')[0]
	const userToHelpId = threadName.split('-')[1]

	const activeThreads = await guild?.channels.fetchActiveThreads()
	const thread = activeThreads?.threads.find(thread => thread.name === threadName)

	const translate = translations[lang as keyof typeof translations]['utils']['thread']['answerCall']
	await thread?.members.add(user)
	await thread?.send(translate['supportEnter'].replace('{userId}', user.id).replace('{userToSupportId}', userToHelpId))
	await message.delete()
}
