import 'reflect-metadata'
import { botContainer } from '@bot/config'
import { Bot } from '@bot'

botContainer.resolve<Bot>('Bot').start()
