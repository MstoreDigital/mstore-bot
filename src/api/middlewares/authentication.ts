import { Request as ExRequest, Response as ExResponse } from 'express'
import { apiKeyMiddleware } from './apiKeyMiddleware'

export function expressAuthentication(
	req: ExRequest,
	securityName: string,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_scopes?: string[]
	// @ts-expect-error need to be any
): Promise<any> {
	if (securityName === 'apiKey') {
		const res = req.res as ExResponse
		return apiKeyMiddleware(req, res)
	}
}
