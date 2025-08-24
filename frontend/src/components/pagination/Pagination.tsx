import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null

  const canPrev = currentPage > 1
  const canNext = currentPage < totalPages

  const handlePrev = () => {
    if (canPrev) onPageChange(currentPage - 1)
  }
  const handleNext = () => {
    if (canNext) onPageChange(currentPage + 1)
  }

  return (
    <nav className="flex justify-center items-center space-x-3 mt-6">
      <button
        onClick={handlePrev}
        disabled={!canPrev}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Prev
      </button>
      <span>
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </span>
      <button
        onClick={handleNext}
        disabled={!canNext}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  )
}

export default Pagination
