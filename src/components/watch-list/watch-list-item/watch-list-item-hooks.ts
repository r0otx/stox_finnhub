import { useState, useEffect } from 'react'
import { fetchQuotes, fetchStockProfile2 } from '../../../finnhub-api/finnhub-api'
import { FinnhubStockProfile } from '../../../finnhub-api/finnhub-api-types'

export const useWatchListItemLoad = (
  symbol: string,
): {
  isLoaded: boolean
  isError: boolean
  currentPrice: number
  previousPrice: number
  openPrice: number
  highPrice: number
  lowPrice: number
  profile?: FinnhubStockProfile
} => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const [currentPrice, setCurrentPrice] = useState(0)
  const [previousPrice, setPreviousPrice] = useState(0)
  const [openPrice, setOpenPrice] = useState(0)
  const [highPrice, setHighPrice] = useState(0)
  const [lowPrice, setLowPrice] = useState(0)
  const [profile, setProfile] = useState<FinnhubStockProfile>()

  useEffect(() => {
    const controller = new AbortController()

    const loadQuotes = async (signal: AbortSignal): Promise<void> => {
      setIsLoaded(false)
      setIsError(false)

      try {
        const { c: currentPrice, pc: previousPrice, o: openPrice, h: highPrice, l: lowPrice } = await fetchQuotes(symbol, signal)
        const profile = await fetchStockProfile2({ symbol }, signal)

        setCurrentPrice(currentPrice)
        setPreviousPrice(previousPrice)
        setOpenPrice(openPrice)
        setHighPrice(highPrice)
        setLowPrice(lowPrice)
        setProfile(profile)
      } catch (error) {
        setIsError(true)
      } finally {
        setIsLoaded(true)
      }
    }

    loadQuotes(controller.signal)

    return (): void => controller.abort()
  }, [symbol])

  return { isLoaded, isError, currentPrice, previousPrice, openPrice, highPrice, lowPrice, profile }
}
