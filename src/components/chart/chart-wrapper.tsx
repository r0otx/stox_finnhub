import React, { FunctionComponent, useEffect, useRef } from 'react'
import {
  Paper,
  Box,
  Typography,
  makeStyles,
  CircularProgress,
  Fade,
  Divider,
  colors,
  fade,
  Tooltip,
} from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { TimelineRounded } from '@material-ui/icons'

import { FinnhubStockProfile } from '../../finnhub-api/finnhub-api-types'
import { SymbolAvatar } from '../symbol-avatar/symbol-avatar'

import { timelines, timeframes } from './chart-configs'
import { useLoadChartData } from './chart-hooks'
import { getChartDataDerivedDetails } from './chart-utils'
import { ChartDataDerivedDetails } from './chart-types'
import { ChartDatesRange } from './chart-dates-range/chart-dates-range'

import { Chart } from './chart'

const useStyles = makeStyles((theme) => ({
  toggleButtonRoot: {
    whiteSpace: 'nowrap',
    fontSize: 12,
    border: 0,
    padding: theme.spacing(1),
    borderRadius: `${theme.spacing(1)}px !important`,
    minWidth: theme.spacing(6),
    marginLeft: `${theme.spacing(0.5)}px !important`,
    color: 'inherit',
    '&:hover, &.Mui-selected:hover': {
      backgroundColor: fade(colors.blueGrey[600], 0.1),
    },
    '&.Mui-selected, &.Mui-selected:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
  },
  toggleButtonLabel: {
    textTransform: 'none',
  },
  toggleButtonDisabled: {
    textTransform: 'none',
  },
  toggleButtonSelected: {
    color: colors.blue[500],
  },
}))

export const ChartWrapper: FunctionComponent<{
  symbol?: string
  profile?: FinnhubStockProfile
}> = ({ symbol, profile }) => {
  const classes = useStyles()
  const {
    setResolution,
    setTimeframe,
    data,
    timeline,
    timeframe,
    disabledResolutions,
    isLoading,
  } = useLoadChartData(profile?.ticker ?? symbol ?? '')

  const chartDerivedDataDetailsRef = useRef<ChartDataDerivedDetails>({})

  useEffect(() => {
    chartDerivedDataDetailsRef.current = getChartDataDerivedDetails(data)
  }, [data])

  return (
    <Box component={Paper} display="flex" flexDirection="column" height="100%">
      <Box
        p={4}
        display="flex"
        flexDirection={['column', 'column', 'row']}
        justifyContent="space-between"
        alignItems={['flex-start', 'flex-start', 'center']}
      >
        <Box minWidth={0} width={['100%', '100%', '40%']} alignItems="center" display="flex">
          <Box mr={2}>
            <SymbolAvatar src={profile?.logo} size={24} iconFontSize="small" />
          </Box>
          <Typography variant="h1" noWrap>
            {profile?.name ?? symbol}
          </Typography>
        </Box>

        <Box
          display="flex"
          mt={[4, 4, 0]}
          alignItems={['flex-start', 'flex-start', 'baseline']}
          flexDirection={['column', 'column', 'row']}
        >
          <Box mr={1}>
            <Typography variant="body2">Chart resolution</Typography>
          </Box>

          <ToggleButtonGroup
            size="small"
            exclusive
            value={timeline}
            onChange={(event, value): void => {
              if (value?.resolution) {
                setResolution(value.resolution)
              }
            }}
          >
            {timelines.map((t) => (
              <ToggleButton
                key={t.resolution}
                value={t}
                disabled={disabledResolutions.includes(t.resolution)}
                classes={{
                  root: classes.toggleButtonRoot,
                  disabled: classes.toggleButtonDisabled,
                  selected: classes.toggleButtonSelected,
                  label: classes.toggleButtonLabel,
                }}
              >
                <Tooltip title={t.title} placement="bottom">
                  <span>{t.label}</span>
                </Tooltip>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Divider />

      <Box flexGrow="1" position="relative" minHeight={[320, 320, 'none']}>
        <Fade in={isLoading} mountOnEnter unmountOnExit>
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        </Fade>

        <Fade in={!isLoading && (!data || data?.length === 0)} mountOnEnter unmountOnExit>
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box width="33%" textAlign="center">
              <TimelineRounded color="inherit" />
              <Typography variant="body1">
                There is no data for the selected time range. Please try different dates or
                timeframe.
              </Typography>
            </Box>
          </Box>
        </Fade>

        <Chart
          data={data ?? []}
          isLoading={isLoading}
          averageValue={chartDerivedDataDetailsRef.current?.average}
          xAxisFormatter={timeline?.formatter}
        />
      </Box>

      <Divider />

      <Box
        px={4}
        py={2}
        display="flex"
        flexDirection={['column-reverse', 'column-reverse', 'row']}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box mr={4}>
          <ChartDatesRange
            start={chartDerivedDataDetailsRef.current.start ?? timeframe.from}
            end={chartDerivedDataDetailsRef.current.end ?? timeframe.to}
            onSet={(start?: number, end?: number): void => {
              setTimeframe({
                from: start ?? 0,
                to: end ?? 0,
              })
            }}
          />
        </Box>

        <ToggleButtonGroup
          size="small"
          exclusive
          value={timeframe}
          onChange={(event, value): void => setTimeframe(value)}
        >
          {timeframes.map((t) => (
            <ToggleButton
              key={t.label}
              value={t}
              classes={{
                root: classes.toggleButtonRoot,
                label: classes.toggleButtonLabel,
              }}
            >
              <Tooltip title={t?.title ?? false} placement="top">
                <span>{t.label}</span>
              </Tooltip>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Box>
  )
}
