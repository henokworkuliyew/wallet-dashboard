import React, { useState, useEffect } from 'react'

interface SearchBarProps {
  initialQuery?: string
  onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  initialQuery = '',
  onSearch,
}) => {
  const [input, setInput] = useState(initialQuery)

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(input.trim())
    }, 500) // debounce 500ms

    return () => clearTimeout(handler)
  }, [input, onSearch])

  return (
    <div className="mb-4">
      <input
        type="search"
        aria-label="Search transactions"
        className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Search by sender, receiver, cause or ID"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
