'use client'

import type React from 'react'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import type { Transaction } from '../../api/transactions'
import {
  extractName,
  getTransactionDirection,
  formatTransactionDate,
} from '../../api/transactions'
import { useNavigate } from 'react-router-dom'

interface RecentTransactionsProps {
  transactions: Transaction[]
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
}) => {
  const navigate = useNavigate()

  const handleViewAll = () => {
    navigate('/history')
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
        <button
          onClick={handleViewAll}
          className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
        >
          View All
        </button>
      </div>

      <div className="space-y-2">
        {transactions.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-6">
            No recent transactions
          </p>
        ) : (
          transactions.slice(0, 5).map((transaction) => {
            const direction = getTransactionDirection(transaction)
            const isIncoming = direction === 'incoming'
            const displayName = isIncoming
              ? extractName(transaction.sender)
              : extractName(transaction.receiver)

            return (
              <div
                key={transaction.id}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isIncoming
                      ? 'bg-green-100 dark:bg-green-900/20'
                      : 'bg-red-100 dark:bg-red-900/20'
                  }`}
                >
                  {isIncoming ? (
                    <FaArrowDown className="text-green-600 dark:text-green-400 text-xs" />
                  ) : (
                    <FaArrowUp className="text-red-600 dark:text-red-400 text-xs" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {displayName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {transaction.cause}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-semibold ${
                      isIncoming
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {isIncoming ? '+' : '-'}
                    {transaction.amount.toLocaleString()} {transaction.currency}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTransactionDate(
                      transaction.created_at 
                    )}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default RecentTransactions
