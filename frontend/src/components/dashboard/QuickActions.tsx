import type React from 'react'
import {
  FaPaperPlane,
  FaDownload,
  FaQrcode,
  FaCreditCard,
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const QuickActions: React.FC = () => {
  const navigate = useNavigate()

  const actions = [
    {
      icon: FaPaperPlane,
      label: 'Send Money',
      description: 'Transfer to contacts',
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => navigate('/transfer'),
    },
    {
      icon: FaDownload,
      label: 'Request',
      description: 'Request payment',
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => console.log('Request money'),
    },
    {
      icon: FaQrcode,
      label: 'QR Code',
      description: 'Scan to pay',
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => console.log('QR Code'),
    },
    {
      icon: FaCreditCard,
      label: 'Top Up',
      description: 'Add money',
      color: 'bg-orange-500 hover:bg-orange-600',
      onClick: () => console.log('Top up'),
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 group"
        >
          <div
            className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
          >
            <action.icon className="text-white text-lg" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
            {action.label}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
            {action.description}
          </p>
        </button>
      ))}
    </div>
  )
}

export default QuickActions
