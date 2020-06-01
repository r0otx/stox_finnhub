import { useEffect, useState } from 'react'
import { Set } from 'immutable'

const LS_STORED_SYMBOLS_KEY = 'stox-watched-symbols'

export const useSymbolsWatchList = (): {
  symbols: Set<string>
  addSymbol: (symbol: string) => void
  removeSymbol: (symbol: string) => void
} => {
  const [symbols, setSymbols] = useState<Set<string>>(Set([]))

  useEffect(() => {
    try {
      const storedSymbols = JSON.parse(localStorage.getItem(LS_STORED_SYMBOLS_KEY) ?? '[]')
      setSymbols(
        Set(
          storedSymbols.length > 0
            ? storedSymbols
            : ['AMZN', 'MSFT', 'BINANCE:BTCUSDT', 'OANDA:XAU_GBP'].reverse(),
        ),
      )
    } catch (error) {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(LS_STORED_SYMBOLS_KEY, JSON.stringify(Array.from(symbols.values())))
    } catch (error) {}
  }, [symbols])

  const addSymbol = (symbol: string): void => {
    setSymbols(symbols.add(symbol))
  }

  const removeSymbol = (symbol: string): void => {
    setSymbols(symbols.remove(symbol))
  }

  return { symbols, addSymbol, removeSymbol }
}
