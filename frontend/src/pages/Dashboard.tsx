'use client'

import type React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import {
  fetchTransactions,
  searchTransactions,
  type Transaction,
} from '../api/transactions'
import TransactionTable from '../components/table/TransactionTable'
import Pagination from '../components/pagination/Pagination'
import { useSearchParam } from '../hooks/useSearchParam'
import SearchBar from '../components/search/SearchBar'
import RecentTransactions from '../components/dashboard/RecentTransactions'
import BalanceCard from '../components/dashboard/BalanceCard'
import QuickActions from '../components/dashboard/QuickActions'

const CURRENT_USER_ACCOUNT = 'Yaya Wallet Pii'

const Dashboard: React.FC = () => {
  const [query, setQuery] = useSearchParam('query', '')
  const [pageStr, setPage] = useSearchParam('p', '1')
  const [rowsPerPageStr, setRowsPerPage] = useSearchParam('per_page', '10')
  const page = Number(pageStr) || 1
  const rowsPerPage = Number(rowsPerPageStr) || 10

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [balanceVisible, setBalanceVisible] = useState(true)

  const [balance] = useState({
    total: 15420.5,
    currency: 'ETB',
    change: 2.5,
    changeType: 'increase' as 'increase' | 'decrease',
  })

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      let data
      if (query) {
        data = await searchTransactions(query, page, rowsPerPage)
      } else {
        data = await fetchTransactions(page, rowsPerPage)
      }
      setTransactions(data.data)
      setTotalPages(data.totalPages || 1)
    } catch (err) {
      setError('Failed to load transactions. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [query, page, rowsPerPage])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleSearch = (newQuery: string) => {
    setPage('1')
    setQuery(newQuery)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage.toString())
  }

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setPage('1')
    setRowsPerPage(newRowsPerPage.toString())
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's your wallet overview.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setBalanceVisible(!balanceVisible)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {balanceVisible ? <FaEyeSlash /> : <FaEye />}
            <span className="text-sm">
              {balanceVisible ? 'Hide' : 'Show'} Balance
            </span>
          </button>
        </div>
      </div>

      {/* Balance Card */}
      <BalanceCard balance={balance} isVisible={balanceVisible} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Transactions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                All Transactions
              </h2>
              <SearchBar
                initialQuery={query}
                onSearch={handleSearch}
                loading={loading}
              />
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
                  transactions={transactions}
                  currentUserAccount={CURRENT_USER_ACCOUNT}
                />
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleRowsPerPageChange}
                />
              </>
            )}
          </div>
        </div>

        <div>
          <RecentTransactions transactions={transactions.slice(0, 5)} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
