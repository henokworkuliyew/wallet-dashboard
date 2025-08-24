import React, { useState, useEffect, useCallback } from 'react'
import {
  fetchTransactions,
  searchTransactions,
  type Transaction,
  
} from '../api/transactions'
import Page from '../components/layout/Page'
import TransactionTable from '../components/table/TransactionTable'
import Pagination from '../components/pagination/Pagination'
import { useSearchParam } from '../hooks/useSearchParam'
import SearchBar from '../components/search/SearchBar'

const CURRENT_USER_ACCOUNT = 'current-user-account' // TODO: Replace with real user account if available

const Dashboard: React.FC = () => {
  const [query, setQuery] = useSearchParam('query', '')
  const [pageStr, setPage] = useSearchParam('p', '1')
  const page = Number(pageStr) || 1

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      let data
      if (query) {
        data = await searchTransactions(query, page)
      } else {
        data = await fetchTransactions(page)
      }
      setTransactions(data.data)
      setTotalPages(data.totalPages)
    } catch (err) {
      console.error(err)
      setError('Failed to load transactions. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [query, page])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleSearch = (newQuery: string) => {
    setPage('1') // reset page on new search
    setQuery(newQuery)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage.toString())
  }

  return (
    <Page title="Dashboard">
      <SearchBar initialQuery={query} onSearch={handleSearch} />
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && !error && (
        <>
          <TransactionTable
            transactions={transactions}
            currentUserAccount={CURRENT_USER_ACCOUNT}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Page>
  )
}

export default Dashboard
