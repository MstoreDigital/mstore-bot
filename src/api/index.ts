import type { IncomingMessage, Server, ServerResponse } from 'http'
import express, {
	json,
	urlencoded,
	type Application,
	type Request as ExRequest,
	type Response as ExResponse,
} from 'express'
import { RegisterRoutes } from '@tsoa-build/routes'
import { singleton } from 'tsyringe'
import { env } from '@config'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'

@singleton()
export class Api {
	private static instance: Application
	private static server: Server<typeof IncomingMessage, typeof ServerResponse>

	constructor() {
		console.log('> [api] Api started the configuration...')
		Api.instance = express()
		Api.config()
		Api.routes()
		console.log('> [api] Api configured with success!')
	}

	public start(): Api {
		console.log('> [api] Api starting to listen...')
		Api.server = Api.instance.listen(env['PORT'] as string, () => {
			console.log(`> [api] Api listening at the port ${env['PORT']}!`)
		})
		return this
	}
	public stop(): void {
		Api.server.close()
	}
	private static config(): void {
		Api.instance.use(urlencoded({ extended: true }))
		Api.instance.use(json())
		Api.instance.use(cors({
			allowedHeaders: ['Authorization', 'Content-Type'],
			exposedHeaders: '*',
			credentials: true,
			methods: 'GET,OPTIONS,PUT,PATCH,POST,DELETE',
			origin: env['BACK_END_BASE_URL']
		}))
		Api.instance.disable('x-powered-by')
	}

	private static routes(): void {
		Api.instance.use('/api/v1/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
			return res.send(swaggerUi.generateHTML(await import('@tsoa-build/swagger.json')))
		})
		RegisterRoutes(Api.instance)
	}
}
