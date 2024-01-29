import { Route, Tags, Controller, Security, Get, SuccessResponse } from 'tsoa'

@Route('api/v1/hello')
@Tags('Bot')
export class BotController extends Controller {
	/**
	 * See a hello world
	 *
	 */
	@SuccessResponse(200)
	@Get()
	@Security('apiKey', [])
	public async helloWorld(): Promise<{ message: 'Hello world!' }> {
		return { message: 'Hello world!' }
	}
}
