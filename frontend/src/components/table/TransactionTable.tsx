import React from 'react'
import TransactionRow from './TransactionRow'
import type { Transaction } from '../../api/transactions'

interface TransactionTableProps {
  transactions: Transaction[]
  currentUserAccount: string
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  currentUserAccount,
}) => {
  if (transactions.length === 0) {
    return <p className="text-center text-gray-500">No transactions found.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 text-left font-semibold text-sm">
              Transaction ID
            </th>
            <th className="px-3 py-2 text-left font-semibold text-sm">
              Sender
            </th>
            <th className="px-3 py-2 text-left font-semibold text-sm">
              Receiver
            </th>
            <th className="px-3 py-2 text-right font-semibold text-sm">
              Amount
            </th>
            <th className="px-3 py-2 text-center font-semibold text-sm">
              Currency
            </th>
            <th className="px-3 py-2 text-left font-semibold text-sm">Cause</th>
            <th className="px-3 py-2 text-left font-semibold text-sm">
              Created At
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <TransactionRow
              key={tx.id}
              transaction={tx}
              currentUserAccount={currentUserAccount}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable
