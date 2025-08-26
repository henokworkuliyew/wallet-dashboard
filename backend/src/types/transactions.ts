export interface ServerTimeResponse {
  time?: number
  timestamp?: number
  data?: { timestamp?: number }
}

export interface Transaction {
  sender: any
  receiver: any
  [key: string]: any
}

export interface ApiResponse {
  data: Transaction[]
  [key: string]: any
}
