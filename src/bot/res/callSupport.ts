import { ActionRowBuilder, ButtonBuilder, ChannelType, ForumChannel, MediaChannel, TextChannel, ButtonStyle, EmbedBuilder, Message } from 'discord.js'
import { DiscordButtonResponse } from '@bot/res'
import { mstore } from '@bot/constants'

export const callSupport: DiscordButtonResponse = async ({ user, guild, channelId, locale }) => {
	const channel = guild?.channels.cache.get(channelId) as ForumChannel | MediaChannel
	const thread = await channel.threads.create({
		name: `help-${user.id}`,
		type: ChannelType.PrivateThread
	} as any)
	await thread?.members.add(user)
	await thread?.send(`<@${user.id}> você tem até 60 minutos para responder as perguntas que lhe serão feitas, com base nelas nós iremos conseguir encontrar alguém capaz de te ajudar!`)

	let steps = 0
	const embed = new EmbedBuilder()
		.setAuthor({ name: user.username })
		.addFields({ name: 'language', value: locale, inline: true })
	const questions = [
		{
			question: 'Digite um título que descreva a sua situação?',
			action: (title: string) => { embed.setTitle(title) }
		},
		{
			question: 'Qual foi o problema com o qual você se deparou?',
			action: (description: string) => { embed.setDescription(description) }
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
		await thread.send('Finalizamos o seu pedido por ajuda, pedimos para que aguarde, você logo será atendido.')
		const answerCallButton = new ButtonBuilder()
			.setCustomId('answer_call')
			.setLabel('Answer call')
			.setStyle(ButtonStyle.Primary)
		const row = new ActionRowBuilder<ButtonBuilder>().addComponents(answerCallButton)
		
		const answerCall = guild?.channels.cache.get(mstore['ANSWER_CHANNEL_CALL_ID']) as TextChannel
		await answerCall.send({
			content: `New call: help-${user.id}`,
			embeds: [embed],
			components: [row]
		}).then((m) => console.log(m))
	}
}
