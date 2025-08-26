import { Request, Response, Router } from 'express'
import { Transaction, ApiResponse } from '../types/transactions'
import { generateSignature, getServerTime } from '../services/yayaClient'
import { API_KEY, BASE_URL } from '../config/env'
import axios, { AxiosResponse, AxiosError } from 'axios'

const router = Router()

router.get('/transactions', async (req: Request, res: Response) => {
  try {
    const endpoint: string = `/api/en/transaction/find-by-user`
    const timestamp: string = await getServerTime()
    const signature: string = generateSignature(timestamp, 'GET', endpoint, '')

    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${BASE_URL}${endpoint}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'YAYA-API-KEY': API_KEY,
          'YAYA-API-TIMESTAMP': timestamp,
          'YAYA-API-SIGN': signature,
        },
        timeout: 10000, 
      }
    )

    const allTransactions: Transaction[] = response.data.data.map(
      (tx: any) => ({
        ...tx,
        sender: JSON.stringify(tx.sender),
        receiver: JSON.stringify(tx.receiver),
        created_at:
          tx.created_at || tx.timestamp || tx.date || new Date().toISOString(),
      })
    )

    const page: number = parseInt((req.query.p as string) || '1', 10)
    const perPage: number = parseInt((req.query.per_page as string) || '10', 10)
    const offset: number = (page - 1) * perPage
    const paginatedData: Transaction[] = allTransactions.slice(
      offset,
      offset + perPage
    )

    res.json({
      data: paginatedData,
      current_page: page,
      last_page: Math.ceil(allTransactions.length / perPage),
      per_page: perPage,
      total: allTransactions.length,
    })
  } catch (err: any) {
    const error = err as AxiosError
    console.error('Error fetching transactions:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    })
    res.status(500).json({ error: 'Failed to fetch transactions from API' })
  }
})

router.get('/search', async (req: Request, res: Response) => {
  try {
    const query: string = (req.query.q as string) || ''
    const endpoint: string = `/api/en/transaction/search`
    const timestamp: string = await getServerTime()
    const body: string = JSON.stringify({ query })
    const signature: string = generateSignature(
      timestamp,
      'POST',
      endpoint,
      body
    )

    console.log('Requesting search:', { endpoint, query, timestamp, signature })

    const response: AxiosResponse = await axios.post(
      `${BASE_URL}${endpoint}`,
      { query },
      {
        headers: {
          'Content-Type': 'application/json',
          'YAYA-API-KEY': API_KEY,
          'YAYA-API-TIMESTAMP': timestamp,
          'YAYA-API-SIGN': signature,
        },
        timeout: 10000, 
      }
    )

    console.log('API Response:', response.data)

    const allTransactions: Transaction[] = response.data.data.map(
      (tx: any) => ({
        ...tx,
        sender: JSON.stringify(tx.sender),
        receiver: JSON.stringify(tx.receiver),
        created_at:
          tx.created_at || tx.timestamp || tx.date || new Date().toISOString(),
      })
    )

    const page: number = parseInt((req.query.p as string) || '1', 10)
    const perPage: number = parseInt((req.query.per_page as string) || '10', 10)
    const offset: number = (page - 1) * perPage
    const paginatedData: Transaction[] = allTransactions.slice(
      offset,
      offset + perPage
    )

    res.json({
      data: paginatedData,
      current_page: page,
      last_page: Math.ceil(allTransactions.length / perPage),
      per_page: perPage,
      total: allTransactions.length,
    })
  } catch (err: any) {
    const error = err as AxiosError
    console.error('Error searching transactions:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    })
    res.status(500).json({ error: 'Failed to search transactions from API' })
  }
})

export default router
