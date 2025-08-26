
import { useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useSearchParam = (
  key: string,
  defaultValue: string
): [string, (value: string) => void] => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState(
    () => searchParams.get(key) || defaultValue
  )

  const setParam = useCallback(
    (newValue: string) => {
      setValue(newValue)
      const newSearchParams = new URLSearchParams(searchParams)
      if (newValue === defaultValue || newValue === '') {
        newSearchParams.delete(key)
      } else {
        newSearchParams.set(key, newValue)
      }
      setSearchParams(newSearchParams)
    },
    [key, defaultValue, searchParams, setSearchParams]
  )

  return [value, setParam]
}
