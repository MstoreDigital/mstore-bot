import { readRecursive } from '@utils'
import { Client, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js'
import { join } from 'path'

export const registerCommands = async (client: Client) => {
	const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = []
	await readRecursive(join(__dirname, '../commands'), async (file: string) => {
		const { command } = await import(file)
		if (!command) {
			return console.log(`> [bot] Don't exists an command constant exported in the file: ${file}`)
		}
		client.commands.set(command.data.name, command)
		commands.push(command.data.toJSON())
	})
	return commands
}
