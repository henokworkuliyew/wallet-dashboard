export type Transaction = {
  id: string
  sender: string
  receiver: string
  amount: number
  currency: string
  cause: string
  createdAt: string // ISO string
}

export type UpstreamTransaction = {
  id: string
  sender: string
  receiver: string
  amount: number
  currency: string
  cause: string
  createdAt: string
}

export type Paginated<T> = {
  data: T[]
  page: number
  pageSize: number
  totalPages: number
  total: number
}
