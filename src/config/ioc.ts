import { IocContainer } from '@tsoa/runtime'
import { container } from 'tsyringe'
import { Bot } from '@bot'

container.register('Bot', { useClass: Bot })

export const iocContainer: IocContainer = {
	get: <T>(controller: { prototype: T }): T => {
		return container.resolve<T>(controller as never)
	}
}

export { container }
