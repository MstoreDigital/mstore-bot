import { Request as ExRequest, Response as ExResponse } from 'express'
import { env } from '@config'

export async function apiKeyMiddleware(req: ExRequest, res: ExResponse) {
	const apiKey = req.query['apiKey']
	console.log(req.query)
	console.log(apiKey)
	if (apiKey !== env['API_KEY']) {
		return res.status(403).json({ error: 'UNAUTHORIZED_KEY' })
	}

	return {
		id: 1,
		name: 'Ironman'
	}
}
