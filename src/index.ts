import 'reflect-metadata'
import { container } from '@config'
import { Bot } from '@bot'
import { App } from '@api'

container.resolve<Bot>(Bot).start().then(() => container.resolve<App>(App).start())
