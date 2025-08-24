import React from 'react'
import type { Transaction } from '../../api/transactions'

interface TransactionRowProps {
  transaction: Transaction
  currentUserAccount: string
}

const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  currentUserAccount,
}) => {
  const { id, sender, receiver, amount, currency, cause, createdAt } =
    transaction

  // Determine direction: incoming if receiver === current user or top-up (sender === receiver)
  const isIncoming = receiver === currentUserAccount || sender === receiver

  return (
    <tr
      className={`border-b ${
        isIncoming ? 'bg-green-50' : 'bg-red-50'
      } hover:bg-gray-100 transition-colors`}
      title={isIncoming ? 'Incoming transaction' : 'Outgoing transaction'}
    >
      <td className="px-3 py-2 text-sm font-mono">{id}</td>
      <td className="px-3 py-2">{sender}</td>
      <td className="px-3 py-2">{receiver}</td>
      <td className="px-3 py-2 text-right font-semibold">
        {isIncoming ? '+' : '-'}
        {amount.toFixed(2)}
      </td>
      <td className="px-3 py-2 text-center">{currency}</td>
      <td className="px-3 py-2">{cause}</td>
      <td className="px-3 py-2 text-xs text-gray-600 whitespace-nowrap">
        {new Date(createdAt).toLocaleString()}
      </td>
    </tr>
  )
}

export default TransactionRow
