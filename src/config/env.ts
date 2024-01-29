import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	DISCORD_BOT_TOKEN: z.string()
})

export const env = envSchema.parse(process.env)
