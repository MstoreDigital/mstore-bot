import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	BACK_END_BASE_URL: z.string().url(),
	DISCORD_BOT_TOKEN: z.string(),
	API_KEY: z.string(),
	PORT: z.string()
})

export const env = envSchema.parse(process.env)
