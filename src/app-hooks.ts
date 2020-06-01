import { useEffect, useState } from 'react'

import { FinnhubSymbol } from './finnhub-api/finnhub-api-types'
import { fetchStockSymbols, fetchForexSymbols, fetchCryptoSymbols } from './finnhub-api/finnhub-api'

export const useSymbolsListLoad = (): {
  options: FinnhubSymbol[]
  isLoading: boolean
  isError: boolean
} => {
  const [options, setOptions] = useState<FinnhubSymbol[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    const loadStockSymbols = async (): Promise<void> => {
      try {
        setIsLoading(true)
        setIsError(false)

        const stockSymbols = await fetchStockSymbols(controller.signal)
        const forexSymbols = await fetchForexSymbols(controller.signal)
        const cryptoSymbols = await fetchCryptoSymbols(controller.signal)

        setOptions(([] as FinnhubSymbol[]).concat(stockSymbols, forexSymbols, cryptoSymbols))
      } catch (error) {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadStockSymbols()

    return (): void => controller.abort()
  }, [])

  return { options, isLoading, isError }
}
