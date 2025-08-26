import type React from 'react'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import type { Transaction } from '../../api/transactions'
import {
  extractName,
  getTransactionDirection,
  formatTransactionDate,
} from '../../api/transactions'

interface TransactionTableProps {
  transactions: Transaction[]
  currentUserAccount: string
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  const formatAmount = (
    amount: number,
    currency: string,
    isIncoming: boolean
  ) => {
    const sign = isIncoming ? '+' : '-'
    return `${sign}${amount.toFixed(2)} ${currency}`
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <FaArrowUp className="text-gray-400 text-xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No transactions found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Your transaction history will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Transaction History
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {transactions.length} transactions
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-600 dark:text-gray-300 text-sm">
                Type
              </th>
              <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-600 dark:text-gray-300 text-sm">
                Transaction ID
              </th>
              <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-600 dark:text-gray-300 text-sm">
                Sender
              </th>
              <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-600 dark:text-gray-300 text-sm">
                Receiver
              </th>
              <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-600 dark:text-gray-300 text-sm">
                Amount
              </th>
              <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-600 dark:text-gray-300 text-sm">
                Cause
              </th>
              <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-600 dark:text-gray-300 text-sm">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              const direction = getTransactionDirection(transaction)
              const isIncoming = direction === 'incoming'

              return (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center">
                      {isIncoming ? (
                        <div className="flex items-center text-green-600 dark:text-green-400">
                          <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-2">
                            <FaArrowDown className="text-xs" />
                          </div>
                          <span className="text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                            In
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600 dark:text-red-400">
                          <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-2">
                            <FaArrowUp className="text-xs" />
                          </div>
                          <span className="text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-1 rounded">
                            Out
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4 sm:px-6">
                    <span className="text-gray-600 dark:text-gray-300 font-mono text-sm">
                      {transaction.id.length > 8
                        ? `${transaction.id.substring(0, 8)}...`
                        : transaction.id}
                    </span>
                  </td>

                  <td className="py-4 px-4 sm:px-6">
                    <span className="text-gray-900 dark:text-white font-medium">
                      {extractName(transaction.sender)}
                    </span>
                  </td>

                  <td className="py-4 px-4 sm:px-6">
                    <span className="text-gray-900 dark:text-white font-medium">
                      {extractName(transaction.receiver)}
                    </span>
                  </td>

                  <td className="py-4 px-4 sm:px-6">
                    <span
                      className={`font-semibold ${
                        isIncoming
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {formatAmount(
                        transaction.amount,
                        transaction.currency,
                        isIncoming
                      )}
                    </span>
                  </td>

                  <td className="py-4 px-4 sm:px-6">
                    <span className="text-gray-700 dark:text-gray-300">
                      {transaction.cause}
                    </span>
                  </td>

                  <td className="py-4 px-4 sm:px-6">
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {formatTransactionDate(
                        transaction.created_at
                      )}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionTable
