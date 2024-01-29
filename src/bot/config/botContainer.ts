import { container } from 'tsyringe'
import { Bot } from '@bot'

container.register('Bot', { useClass: Bot })

export { container as botContainer }
