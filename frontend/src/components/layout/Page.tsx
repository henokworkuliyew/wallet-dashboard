import React from 'react'

interface PageProps {
  children: React.ReactNode
  title?: string
}

const Page: React.FC<PageProps> = ({ children, title }) => {
  React.useEffect(() => {
    if (title) document.title = title + ' - YaYa Wallet Dashboard'
  }, [title])

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          YaYa Wallet Transaction Dashboard
        </h1>
      </header>
      <main>{children}</main>
      <footer className="mt-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} YaYa Wallet
      </footer>
    </div>
  )
}

export default Page
