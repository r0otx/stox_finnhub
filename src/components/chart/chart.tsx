import React, { FunctionComponent } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  XAxis,
  // CartesianGrid,
  Tooltip as RechartsTooltip,
  TickFormatterFunction,
} from 'recharts'
import { useTheme, makeStyles, colors } from '@material-ui/core'

import { getCurrencyFormatter, getNumeralFormatter } from '../../utils/formatters'

import { renderReferenceLine } from './chart-reference-line/chart-reference-line'
import { ChartTooltip } from './chart-tooltip/chart-tooltip'
import { ChartData } from './chart-types'

const useStyles = makeStyles(() => ({
  loadingChart: {
    opacity: 0.5,
  },
}))

export const Chart: FunctionComponent<{
  data: ChartData
  isLoading?: boolean
  xAxisFormatter?: TickFormatterFunction
  averageValue?: number
}> = ({ data, isLoading, xAxisFormatter, averageValue }) => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <ResponsiveContainer height="100%">
      <LineChart
        margin={{
          top: theme.spacing(8),
          bottom: 0,
          left: theme.spacing(4),
          right: theme.spacing(4),
        }}
        data={data ?? []}
        className={isLoading ? classes.loadingChart : ''}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          axisLine={false}
          dy={theme.spacing(1)}
          padding={{
            left: theme.spacing(4),
            right: theme.spacing(4),
          }}
          interval="preserveStartEnd"
          minTickGap={24}
          tickSize={3}
          dataKey="timestamp"
          tickFormatter={xAxisFormatter}
        />

        <YAxis
          hide
          dataKey="openPrice"
          interval="preserveStartEnd"
          domain={['dataMin', 'dataMax']}
          tickFormatter={getCurrencyFormatter()}
          tickCount={10}
          allowDataOverflow={false}
        />

        <YAxis
          hide
          axisLine={false}
          tickLine={false}
          minTickGap={24}
          dataKey="closePrice"
          interval="preserveStartEnd"
          orientation="right"
          domain={['dataMin', 'dataMax']}
          tickFormatter={getCurrencyFormatter()}
          tickCount={10}
          allowDataOverflow={false}
        />

        <YAxis
          hide
          yAxisId="volumeAxis"
          dataKey="volume"
          interval="preserveStartEnd"
          orientation="left"
          tickFormatter={getNumeralFormatter()}
          tickCount={10}
          domain={['dataMin', 'dataMax']}
          allowDataOverflow={false}
        />

        <RechartsTooltip content={<ChartTooltip />} />

        <Line
          dot={false}
          // type="monotone"
          dataKey="closePrice"
          stroke={theme.palette.primary.main}
          strokeWidth={2}
        />

        <Line
          dot={false}
          // type="monotone"
          dataKey="openPrice"
          stroke={theme.palette.primary.light}
          strokeWidth={1}
        />

        <Line
          dot={false}
          type="monotone"
          yAxisId="volumeAxis"
          dataKey="volume"
          strokeDasharray="1 4"
          stroke={colors.blueGrey[500]}
        />

        {averageValue && renderReferenceLine('average', averageValue)}
      </LineChart>
    </ResponsiveContainer>
  )
}
