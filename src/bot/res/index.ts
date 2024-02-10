import { ButtonInteraction } from 'discord.js'
import { callSupport, answerCall } from './utils'

export type DiscordButtonResponse = (interaction: ButtonInteraction) => Promise<void>

export const responses = {
	'call_support': callSupport,
	'answer_call': answerCall
}
