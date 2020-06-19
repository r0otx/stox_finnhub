export type FinnhubStockCandleResolution = '5S' | '1' | '5' | '15' | '30' | '60' | 'D' | 'W' | 'M' | 'S'

export type FinnhubStockCandleQuery = {
  symbol: string
  resolution: FinnhubStockCandleResolution
  adjusted?: boolean
  count?: number
  from?: number
  to?: number
}

export type FinnhubStockCandlesResponseStatus = 'ok' | 'no_data'

export type FinnhubStockCandlesResponseData = {
  c: number[]
  v: number[]
  t: number[]
  o: number[]
  s: FinnhubStockCandlesResponseStatus
}

export type FinnhubStockProfile2Query = {
  symbol: string
}

export type FinnhubStockProfile = {
  name: string
  country: string
  currency: string
  marketCapitalization: number
  logo: string
  ticker: string
}

export type FinnhubQuoteResponseData = {
  c: number
  h: number
  l: number
  o: number
  pc: number
  t: number
}

export enum FinnhubSymbolType {
  stock = 'stock',
  forex = 'forex',
  crypto = 'crypto',
}

export type FinnhubSymbol = {
  description: string
  displaySymbol: string
  symbol: string
  type?: FinnhubSymbolType
}

export type FinnhubWebSocketMessageEventData = {
  type: 'trade' | 'error' | 'ping'
  data?: {
    s: string
    p: number
    t: number
    v: number
  }[]
  msg?: string
}
