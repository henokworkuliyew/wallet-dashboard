import dotenv from 'dotenv'

dotenv.config()

export const API_KEY: string | undefined = process.env.YAYA_API_KEY
export const API_SECRET: string | undefined = process.env.YAYA_API_SECRET
export const YAYA_ENV: string = process.env.YAYA_ENV || 'sandbox'
export const PORT: string | number = process.env.PORT || 5000

export const BASE_URL: string =
  YAYA_ENV === 'production'
    ? 'https://yayawallet.com'
    : 'https://sandbox.yayawallet.com'

console.log('Environment Variables:', {
  YAYA_API_KEY: process.env.YAYA_API_KEY,
  YAYA_API_SECRET: process.env.YAYA_API_SECRET?.slice(0, 10) + '...',
  YAYA_ENV: process.env.YAYA_ENV,
  PORT: process.env.PORT,
})
