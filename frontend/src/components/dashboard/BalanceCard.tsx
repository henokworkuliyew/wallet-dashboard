import type React from 'react'
import { FaArrowUp, FaArrowDown, FaWallet } from 'react-icons/fa'

interface BalanceCardProps {
  balance: {
    total: number
    currency: string
    change: number
    changeType: 'increase' | 'decrease'
  }
  isVisible: boolean
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance, isVisible }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: balance.currency,
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <FaWallet className="text-xl" />
          </div>
          <div>
            <p className="text-blue-100 text-sm">Total Balance</p>
            <h2 className="text-3xl font-bold">
              {isVisible ? formatCurrency(balance.total) : '••••••'}
            </h2>
          </div>
        </div>

        <div className="text-right">
          <div
            className={`flex items-center space-x-1 ${
              balance.changeType === 'increase'
                ? 'text-green-300'
                : 'text-red-300'
            }`}
          >
            {balance.changeType === 'increase' ? (
              <FaArrowUp />
            ) : (
              <FaArrowDown />
            )}
            <span className="text-sm font-medium">{balance.change}%</span>
          </div>
          <p className="text-blue-100 text-xs mt-1">vs last month</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-blue-100 text-xs">This Month</p>
          <p className="text-lg font-semibold">
            {isVisible ? formatCurrency(3240.8) : '••••••'}
          </p>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-blue-100 text-xs">Last Transaction</p>
          <p className="text-lg font-semibold">
            {isVisible ? formatCurrency(125.0) : '••••••'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default BalanceCard
