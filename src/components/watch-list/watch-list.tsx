import React, { FunctionComponent, useState, useEffect, useRef } from 'react'
import { Box, Divider, Typography, Paper, Button, Collapse, useTheme } from '@material-ui/core'

import { FinnhubStockProfile, FinnhubSymbol } from '../../finnhub-api/finnhub-api-types'

import { WatchListSearch } from './watch-list-search/watch-list-search'
import { WatchListItem } from './watch-list-item/watch-list-item'
import { useSymbolsWatchList } from './watch-list-hooks'
import { MAX_WATCH_LIST_ITEMS } from './watch-list-constants'
import { EditRounded, DoneRounded } from '@material-ui/icons'

export const WatchList: FunctionComponent<{
  symbolOptions: FinnhubSymbol[]
  onError: () => void
  onSelectedItem: (symbol: string, profile: FinnhubStockProfile) => void
}> = ({ symbolOptions, onSelectedItem, onError }) => {
  const theme = useTheme()
  const { symbols, addSymbol, removeSymbol } = useSymbolsWatchList()

  const [edit, setEdit] = useState(false)
  const [showMaxLimitMessage, setShowMaxLimitMessage] = useState(false)

  const firstProfileLoadedRef = useRef<FinnhubStockProfile>()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowMaxLimitMessage(false)
    }, 4000)

    return (): void => clearTimeout(timeout)
  }, [showMaxLimitMessage])

  return (
    <Paper elevation={1} style={{ height: '100%' }}>
      <Box display="flex" flexDirection="column" height="100%">
        <Box py={2} px={4} display="flex" alignItems="center" minHeight={60}>
          <Box flexGrow="1">
            <WatchListSearch
              options={symbolOptions}
              onSelect={(symbol): void => {
                const maxLimitReached = symbols.size >= MAX_WATCH_LIST_ITEMS

                if (maxLimitReached) {
                  setShowMaxLimitMessage(true)
                  return
                }

                addSymbol(symbol)
                setEdit(false)
              }}
            />
          </Box>
        </Box>

        <Divider />

        <Collapse in={showMaxLimitMessage}>
          <Box px={4} py={2} bgcolor={theme.palette.secondary.main} color="#fff">
            Maximum watch limit is {MAX_WATCH_LIST_ITEMS} companies.
            <br />
            Please upgrade your plan to watch more.
          </Box>
        </Collapse>

        <Box py={2} flexGrow={1}>
          {symbols.size > 0 ? (
            <Box>
              {Array.from(symbols.values())
                .reverse()
                .map((symbol) => (
                  <Box key={symbol} p={4}>
                    <WatchListItem
                      edit={edit}
                      symbol={symbol}
                      onError={onError}
                      onSelect={(profile): void => onSelectedItem(symbol, profile)}
                      onRemove={(): void => removeSymbol(symbol)}
                      // @ts-ignore
                      getProfile={(profile)}
                      onProfileLoad={(profile): void => {
                        if (!firstProfileLoadedRef.current) {
                          firstProfileLoadedRef.current = profile
                          onSelectedItem(symbol, profile)
                        }
                      }}
                    />
                  </Box>
                ))}
            </Box>
          ) : (
            <Box p={4}>
              <Typography variant="body1">
                <span role="img" aria-labelledby="no-results">
                  ☝️
                </span>
                &nbsp;
                <span id="no-results">Use the search field to watch stocks</span>
              </Typography>
            </Box>
          )}
        </Box>

        <Divider />

        <Box p={2} display="flex" justifyContent="center">
          <Button
            fullWidth
            variant="text"
            color={edit ? 'inherit' : 'primary'}
            onClick={(): void => setEdit(!edit)}
            startIcon={edit ? <DoneRounded /> : <EditRounded />}
          >
            {edit ? 'Done' : 'Edit WatchList'}
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
