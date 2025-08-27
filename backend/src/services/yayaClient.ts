import axios, { AxiosResponse } from 'axios'
import crypto from 'crypto'
import { ServerTimeResponse } from '../types/transactions.js'
import { API_SECRET, BASE_URL } from '../config/env.js'

export function generateSignature(
  timestamp: string,
  method: string,
  endpoint: string,
  body: string = ''
): string {
  const pathOnly: string = endpoint.split('?')[0]
  const stringToSign: string =
    timestamp + method.toUpperCase() + pathOnly + body

  const signature: string = crypto
    .createHmac('sha256', API_SECRET || '')
    .update(stringToSign)
    .digest('base64')

  console.log('DEBUG AUTH:', {
    timestamp,
    method,
    endpoint,
    stringToSign,
    apiKey: API_SECRET ? API_SECRET.slice(0, 10) + '...' : 'MISSING',
    signature: signature.slice(0, 12) + '...',
  })

  return signature
}

export async function getServerTime(): Promise<string> {
  const { data }: AxiosResponse<ServerTimeResponse> = await axios.get(
    `${BASE_URL}/api/en/time`
  )
  const timestamp: number | undefined =
    data.time || data.timestamp || data.data?.timestamp
  if (!timestamp) throw new Error('No timestamp in response from YaYa server')
  return timestamp.toString()
}
