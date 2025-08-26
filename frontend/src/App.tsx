import type React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Layout from './components/layout/Layout'
import Transfer from './pages/Transfer'
import History from './pages/History'
import Settings from './pages/Settings'


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    404
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Page not found
                  </p>
                </div>
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
