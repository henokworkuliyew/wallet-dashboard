import dotenv from 'dotenv'

dotenv.config()

function required(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing required env var: ${name}`)
  return v
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '5000', 10),
  allowedOrigin: process.env.ALLOWED_ORIGIN ?? '*',
  yaya: {
    baseUrl: required('YAYA_API_BASE'),
    apiKey: required('YAYA_API_KEY'),
    apiSecret: required('YAYA_API_SECRET'),
  },
}
