import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export function useSearchParam(
  key: string,
  defaultValue = ''
): [string, (value: string) => void] {
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState(
    () => searchParams.get(key) || defaultValue
  )

  useEffect(() => {
    const paramValue = searchParams.get(key) || defaultValue
    setValue(paramValue)
  }, [searchParams, key, defaultValue])

  const updateValue = (newValue: string) => {
    if (newValue) {
      searchParams.set(key, newValue)
    } else {
      searchParams.delete(key)
    }
    setSearchParams(searchParams)
  }

  return [value, updateValue]
}
