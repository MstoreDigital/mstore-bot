import 'reflect-metadata'
import { container } from '@config'
import { Bot } from '@bot'

container.resolve<Bot>('Bot').start()
