import React, { FunctionComponent, ReactNode } from 'react'
import { Box, Typography, useTheme, fade, colors } from '@material-ui/core'

import { ChartTooltipPayload, ChartDataItemKeys } from '../chart-types'
import {
  getTimestampFormatter,
  getCurrencyFormatter,
  getNumeralFormatter,
} from '../../../utils/formatters'

const formatTimestamp = getTimestampFormatter()
const formatCurrency = getCurrencyFormatter()
const formatNumeral = getNumeralFormatter('0,0')

export const ChartTooltip: FunctionComponent<{
  active?: boolean
  payload?: ChartTooltipPayload[]
  label?: string
}> = ({ active, payload: lines, label }) => {
  const theme = useTheme()

  if (!active || !lines) return null

  const getLineData = (dataKey: ChartDataItemKeys): { color?: string; value?: number } => {
    const payload = lines?.find((line) => line.dataKey === dataKey)
    const color = payload?.color
    const value = (payload?.payload ?? {})[dataKey]

    return { color, value }
  }

  const closePriceData = getLineData(ChartDataItemKeys.closePrice)
  const openPriceData = getLineData(ChartDataItemKeys.openPrice)
  const volumeData = getLineData(ChartDataItemKeys.volume)

  return (
    <Box
      p={2}
      bgcolor={fade('#fff', 0.9)}
      borderRadius={1}
      border={`1px solid ${theme.palette.divider}`}
    >
      <Box mb={2}>
        <Typography variant="h4">{formatTimestamp(Number(label))}</Typography>
      </Box>

      {closePriceData.value && (
        <Box fontWeight={600} color={closePriceData.color}>
          Close price: {formatCurrency(closePriceData.value)}
          &nbsp;
          {openPriceData.value &&
            ((): ReactNode => {
              const diff = closePriceData.value - openPriceData.value
              const isPositive = diff >= 0

              return (
                <Box
                  component="span"
                  color={isPositive ? colors.lightGreen[700] : colors.red[400]}
                >{`${isPositive ? '+' : '-'}${formatCurrency(Math.abs(diff))}`}</Box>
              )
            })()}
        </Box>
      )}

      {openPriceData.value && (
        <Box fontWeight={500} color={openPriceData.color}>
          Open price: {formatCurrency(openPriceData.value)}
        </Box>
      )}

      {volumeData.value && (
        <Box fontWeight={500} color={volumeData.color}>
          Volume: {formatNumeral(volumeData.value)}
        </Box>
      )}
    </Box>
  )
}
