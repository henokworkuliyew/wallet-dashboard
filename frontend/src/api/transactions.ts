import apiClient from "./client"

export interface Transaction {
  id: string
  sender: string
  receiver: string
  amount: number
  currency: string
  cause: string
  createdAt: string
}

export interface PaginatedTransactions {
  data: Transaction[]
  page: number
  totalPages: number
  totalItems: number
}

export async function fetchTransactions(
  page = 1
): Promise<PaginatedTransactions> {
  const response = await apiClient.get('/api/transactions', { params: { p: page } })
  return response.data
}

export async function searchTransactions(
  query: string,
  page = 1
): Promise<PaginatedTransactions> {
  const response = await apiClient.post(
    '/transactions/search',
    { query },
    { params: { p: page } }
  )
  return response.data
}
