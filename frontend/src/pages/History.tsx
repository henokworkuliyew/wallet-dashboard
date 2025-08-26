'use client'

import type React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { FaHistory, FaDownload } from 'react-icons/fa'
import {
  fetchTransactions,
  searchTransactions,
  type Transaction,
  getTransactionDirection,
} from '../api/transactions'
import TransactionTable from '../components/table/TransactionTable'
import Pagination from '../components/pagination/Pagination'
import { useSearchParam } from '../hooks/useSearchParam'
import SearchBar from '../components/search/SearchBar'

const CURRENT_USER_ACCOUNT = 'Yaya Wallet Pii'

const History: React.FC = () => {
  const [query, setQuery] = useSearchParam('query', '')
  const [pageStr, setPage] = useSearchParam('p', '1')
  const page = Number(pageStr) || 1
  const [rowsPerPageStr, setRowsPerPage] = useSearchParam('per_page', '10')

  const rowsPerPage = Number(rowsPerPageStr) || 10
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      console.log('Loading data for page:', page, 'query:', query)
      let data
      if (query) {
        data = await searchTransactions(query, page, rowsPerPage)
      } else {
        data = await fetchTransactions(page, rowsPerPage)
      }
      console.log('Loaded transactions:', data)
      setTransactions(data.data)
      setTotalPages(data.totalPages || 1)
    } catch (err) {
      setError('Failed to load transactions. Please try again.')
      console.error(' Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }, [query, page, rowsPerPage])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleSearch = (newQuery: string) => {
    console.log('Search initiated:', newQuery)
    setPage('1')
    setQuery(newQuery)
  }

  const handlePageChange = (newPage: number) => {
    console.log('[v0] Page change requested:', newPage)
    setPage(newPage.toString())
  }

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setPage('1')
    setRowsPerPage(newRowsPerPage.toString())
  }

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === 'all') return true
    const direction = getTransactionDirection(transaction)
    return direction === filter
  })

  const exportTransactions = () => {
    // Mock export functionality
    alert('Exporting transactions...')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
            <FaHistory className="text-purple-600 dark:text-purple-400 text-lg" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Transaction History
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              View all your past transactions
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Transactions</option>
            <option value="incoming">Incoming</option>
            <option value="outgoing">Outgoing</option>
          </select>

          <button
            onClick={exportTransactions}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <FaDownload />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            All Transactions{' '}
            {filteredTransactions.length > 0 &&
              `(${filteredTransactions.length})`}
          </h2>
          <div className="w-full sm:w-auto">
            <SearchBar
              initialQuery={query}
              onSearch={handleSearch}
              loading={loading}
            />
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={loadData}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <TransactionTable
              transactions={filteredTransactions}
              currentUserAccount={CURRENT_USER_ACCOUNT}
            />
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleRowsPerPageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default History
