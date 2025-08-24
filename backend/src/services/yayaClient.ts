import { http, generateSignature, getTimestamp } from '../utils/http.js'
import { env } from '../config/env.js'
import type { Paginated, UpstreamTransaction } from '../types/transactions.js'

export async function findByUser(
  page = 1
): Promise<Paginated<UpstreamTransaction>> {
  try {
    const timestamp = getTimestamp()
    const endpoint = '/transaction/find-by-user'
    const body = '' // Empty for GET
    const signature = generateSignature(
      'GET',
      endpoint,
      body,
      env.yaya.apiSecret,
      timestamp
    )

    const { data } = await http.get(`${env.yaya.baseUrl}${endpoint}`, {
      params: { p: page },
      headers: {
        'YAYA-API-KEY': env.yaya.apiKey,
        'YAYA-API-TIMESTAMP': timestamp.toString(),
        'YAYA-API-SIGN': signature,
        'Content-Type': 'application/json',
      },
    })
    return normalizePagination(data)
  } catch (err) {
    console.error('API Error:', err)
    throw err // Let error handler deal with it
  }
}

export async function search(
  query: string,
  page = 1
): Promise<Paginated<UpstreamTransaction>> {
  try {
    const timestamp = getTimestamp()
    const endpoint = '/transaction/search'
    const body = JSON.stringify({ query }) // JSON body for POST
    const signature = generateSignature(
      'POST',
      endpoint,
      body,
      env.yaya.apiSecret,
      timestamp
    )

    const { data } = await http.post(
      `${env.yaya.baseUrl}${endpoint}`,
      { query },
      {
        params: { p: page },
        headers: {
          'YAYA-API-KEY': env.yaya.apiKey,
          'YAYA-API-TIMESTAMP': timestamp.toString(),
          'YAYA-API-SIGN': signature,
          'Content-Type': 'application/json',
        },
      }
    )
    return normalizePagination(data)
  } catch (err) {
    console.error('API Error:', err)
    throw err
  }
}

function normalizePagination(data: any): Paginated<UpstreamTransaction> {
  const pageSize = data.pageSize || 10 // Default page size if not provided by API
  const total = data.total || 0
  const totalPages = total > 0 ? Math.ceil(total / pageSize) : 1
  return {
    data: data.transactions || [],
    page: data.page || 1,
    pageSize,
    totalPages,
    total,
  }
}
