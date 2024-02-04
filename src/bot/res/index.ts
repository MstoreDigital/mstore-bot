import { ButtonInteraction } from 'discord.js'
import { callSupport } from './callSupport'
import { answerCall } from './answerCall'

export type DiscordButtonResponse = (interaction: ButtonInteraction) => Promise<void>

export const responses = {
	'call_support': callSupport,
	'answer_call': answerCall
}
