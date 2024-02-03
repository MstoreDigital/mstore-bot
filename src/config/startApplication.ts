import { Api } from '@api'
import { Bot } from '@bot'

export const startApplication = async (api: Api, bot: Bot) => {
	await bot.start()
	api.start()

	process.on('SIGINT', () => stop())
	process.on('SIGTERM', () => stop())

	function stop() {
		console.log('> [api] Stopping the API...')
		api.stop()
		console.log('> [api] API stopped successfully!')
		console.log('> [bot] Stopping the bot...')
		bot.stop()
		console.log('> [bot] Bot stopped successfully!...')
	}
}
