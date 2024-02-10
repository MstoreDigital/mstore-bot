import { ActionRowBuilder, ButtonBuilder, ChannelType, ForumChannel, MediaChannel, TextChannel, ButtonStyle, Message } from 'discord.js'
import { DiscordButtonResponse } from '@bot/res'
import { translations } from '@bot/translations'
import { mstore } from '@bot/constants'

export const callSupport: DiscordButtonResponse = async ({ user, guild, channelId, locale }) => {
	const channel = guild?.channels.cache.get(channelId) as ForumChannel | MediaChannel
	const thread = await channel.threads.create({
		name: `help-${user.id}`,
		type: ChannelType.PrivateThread
	} as any)
	await thread?.members.add(user)
	let steps = 0, lang: string = locale
	if (!['en-US', 'pt-BR'].includes(locale)) lang = 'en-US'
	const translate = translations[lang as keyof typeof translations]['utils']['thread']['callSupport']
	
	await thread?.send(translate['startMessage'].replace('{userId}', user.id))
	let content = translate['supportMessage'].replace('{userId}', user.id).replace('{language}', lang)

	const questions = [
		{
			question: translate['question1'],
			action: (product: string) => { content = content.replace('{product}', product) }
		},
		{
			question: translate['question2'],
			action: (problemType: string) => { content = content.replace('{problemType}', problemType) }
		},
		{
			question: translate['question3'],
			action: (problemDescription: string) => { content = content.replace('{problemDescription}', problemDescription) }
		}
	]
	
	await thread.send(questions[steps].question)
	const collectorFilter = (msg: Message) => msg.author.id === user.id && msg.content.length > 0
	const collector = thread?.createMessageCollector({ time: 60 * 60000, filter: collectorFilter })
	collector.on('collect', async (msg) => {
		if (msg.author.id !== user.id) return
		questions[steps].action(msg.content)
		steps++
		if (questions.length === steps) return await finishCallHelp()
		await thread.send(questions[steps].question)
	})
	collector.on('end', () => {
		collector.stop()
	})

	async function finishCallHelp() {
		collector.stop()
		await thread.send(translate['supportRequested'])
		const answerCallButton = new ButtonBuilder()
			.setCustomId('answer_call')
			.setLabel(translate['answerCallLabel'])
			.setStyle(ButtonStyle.Primary)
		const row = new ActionRowBuilder<ButtonBuilder>().addComponents(answerCallButton)
		
		const answerCall = guild?.channels.cache.get(mstore['ANSWER_CHANNEL_CALL_ID']) as TextChannel
		await answerCall.send({ content, components: [row] })
	}
}
