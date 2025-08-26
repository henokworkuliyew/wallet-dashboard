export interface Transaction {
  id: string
  sender: string | TransactionParty
  receiver: string | TransactionParty
  amount: number
  currency: string
  cause: string
  created_at: string
}

export interface TransactionParty {
  name: string
  account: string
}

export interface ApiResponse {
  data: Transaction[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const CURRENT_USER_ACCOUNT = 'yayawalletpi'
export const extractName = (nameField: string | TransactionParty): string => {
  if (typeof nameField === 'string') {
    try {
      const parsed = JSON.parse(nameField)
      return parsed.name || parsed.account || nameField
    } catch {
      return nameField
    }
  }
  if (typeof nameField === 'object' && nameField !== null) {
    return nameField.name || nameField.account || 'Unknown'
  }
  return 'Unknown'
}

export const getAccountId = (party: string | TransactionParty): string => {
  if (typeof party === 'string') {
    try {
      const parsed = JSON.parse(party)
      return (parsed.account || parsed.name || party).toLowerCase().trim()
    } catch {
      return party.toLowerCase().trim()
    }
  }
  if (typeof party === 'object' && party !== null) {
    return (party.account || party.name || '').toLowerCase().trim()
  }
  return ''
}

export const getTransactionDirection = (
  transaction: Transaction,
  currentUserAccount: string = CURRENT_USER_ACCOUNT
): 'incoming' | 'outgoing' => {
  const senderAccount = getAccountId(transaction.sender)
  const receiverAccount = getAccountId(transaction.receiver)
  const userAccount = currentUserAccount.toLowerCase().trim()



  if (senderAccount === receiverAccount) {
    console.log('Top-up transaction detected - incoming')
    return 'incoming'
  }

  if (receiverAccount === userAccount) {
    console.log('User is receiver - incoming')
    return 'incoming'
  }

  if (senderAccount === userAccount) {
    console.log('User is sender - outgoing')
    return 'outgoing'
  }

  console.log('Default case - outgoing')
  return 'outgoing'
}

export const formatTransactionDate = (
  dateString: string | undefined | null
): string => {
  if (!dateString || dateString.trim() === '') {
    console.log('Date is missing or empty:', dateString)
    return 'N/A' 
  }

  console.log('Formatting date:', dateString)

  try {
    let date: Date
    if (dateString.includes('T') || dateString.includes('Z')) {
      date = new Date(dateString)
    } else if (dateString.includes('-') || dateString.includes('/')) {
      date = new Date(dateString)
    } else {
      const timestamp = Number.parseInt(dateString)
      date =
        timestamp < 946684800000
          ? new Date(timestamp * 1000)
          : new Date(timestamp)
    }

    if (isNaN(date.getTime())) {
      console.log('Date parsing failed for:', dateString)
      return 'N/A' 
    }

    const formatted = date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })

    console.log('[v0] Formatted date result:', formatted)
    return formatted
  } catch (error) {
    console.error('[v0] Error formatting transaction date:', error)
    return 'N/A'
  }
}

export const fetchTransactions = async (
  page = 1,
  perPage = 10
): Promise<{ data: Transaction[]; totalPages: number }> => {
  const response = await fetch(
    `${API_BASE_URL}/transactions?p=${page}&per_page=${perPage}`
  )
  if (!response.ok) {
    throw new Error(`API responded with status: ${response.status}`)
  }
  const apiResponse: ApiResponse = await response.json()

  return {
    data: apiResponse.data,
    totalPages:
      apiResponse.last_page ||
      Math.ceil(apiResponse.total / apiResponse.per_page),
  }
}

export const searchTransactions = async (
  query: string,
  page = 1,
  perPage = 10
): Promise<{ data: Transaction[]; totalPages: number }> => {
  const response = await fetch(
    `${API_BASE_URL}/search?q=${encodeURIComponent(
      query
    )}&p=${page}&per_page=${perPage}`
  )
  if (!response.ok) {
    throw new Error(`Search API responded with status: ${response.status}`)
  }
  const apiResponse: ApiResponse = await response.json()

  return {
    data: apiResponse.data,
    totalPages:
      apiResponse.last_page ||
      Math.ceil(apiResponse.total / apiResponse.per_page),
  }
}
