import axios from 'axios'
import { createHmac } from 'crypto' 

export const http = axios.create({
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

export function generateSignature(
  method: string,
  endpoint: string,
  body: string,
  apiSecret: string,
  timestamp: number
): string {
  const preHash = `${timestamp}${method.toUpperCase()}${endpoint}${body}`
  const hmac = createHmac('sha256', apiSecret)
  hmac.update(preHash)
  return hmac.digest('base64')
}

export function getTimestamp(): number {
  return Date.now() 
}
