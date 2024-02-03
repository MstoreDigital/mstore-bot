import 'reflect-metadata'
import { startApplication } from '@config'
import { container } from '@config'
import { Bot } from '@bot'
import { Api } from '@api'

export const bot = container.resolve<Bot>(Bot)
export const api = container.resolve<Api>(Api)

startApplication(api, bot)
