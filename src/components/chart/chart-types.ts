import { TickFormatterFunction } from 'recharts'

import { FinnhubStockCandleResolution } from '../../finnhub-api/finnhub-api-types'

export enum ChartDataItemKeys {
  closePrice = 'closePrice',
  openPrice = 'openPrice',
  timestamp = 'timestamp',
  volume = 'volume',
}

export type ChartDataItem = {
  [ChartDataItemKeys.closePrice]: number
  [ChartDataItemKeys.openPrice]: number
  [ChartDataItemKeys.timestamp]: number
  [ChartDataItemKeys.volume]: number
}

export type ChartData = ChartDataItem[]

export type ChartDataDerivedDetails = {
  start?: number
  end?: number
  max?: number
  min?: number
  average?: number
}

export type ChartTooltipFormatterValue = string | number | React.ReactText[]

export type ChartTooltipFormatterMap = {
  [key: string]: {
    label: string
    format: (value: unknown) => string
  }
}

export type ChartTooltipPayload = {
  color: string
  dataKey: ChartDataItemKeys
  fill: string
  name: string
  payload: ChartDataItem
  stroke: string
  strokeWidth: number
  value: number
}

export type TimelineConfig = {
  resolution: FinnhubStockCandleResolution
  formatter: TickFormatterFunction
  title: string
  label: string
}

export type TimeframeConfig = {
  label?: string
  title?: string
  from: number
  to: number
}
