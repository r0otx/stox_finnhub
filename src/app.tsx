import React, { FunctionComponent, useState } from 'react'
import { Container, Box, useTheme, Typography, Paper } from '@material-ui/core'

import { WatchList } from './components/watch-list/watch-list'
import { ChartWrapper } from './components/chart/chart-wrapper'
import { FinnhubStockProfile } from './finnhub-api/finnhub-api-types'

import { useSymbolsListLoad } from './app-hooks'
import { SentimentVeryDissatisfiedRounded, BusinessCenterRounded } from '@material-ui/icons'

const App: FunctionComponent<{}> = () => {
  const theme = useTheme()

  const { options: symbolOptions } = useSymbolsListLoad()
  const [stockProfile, setStockProfile] = useState<FinnhubStockProfile>()
  const [stockSymbol, setStockSymbol] = useState<string>()
  const [isError, setIsError] = useState(false)

  return (
    <Container style={{ flexGrow: 1 }}>
      <Box
        py={4}
        display={'grid'}
        height="100%"
        gridColumnGap={theme.spacing(4)}
        gridRowGap={theme.spacing(4)}
        gridTemplateColumns={['1fr', '1fr', '3fr 7fr']}
        gridTemplateRows={['max-content', 'max-content', 'max-content 55vh auto']}
      >
        <Box
          display="flex"
          alignItems="center"
          gridColumn={['1/1', '1/1', '1 / span 2']}
          minWidth="0"
        >
        </Box>

        <Box flexGrow="1" minWidth="0" gridRow={['auto', 'auto', '2 / span 2']}>
          <WatchList
            symbolOptions={symbolOptions}
            onSelectedItem={(symbol: string, profile?: FinnhubStockProfile): void => {
              setStockSymbol(symbol)
              setStockProfile(profile)
            }}
            onError={(): void => setIsError(true)}
          />
        </Box>

        <Box minWidth={0}>
          {isError ? (
            <Box
              component={Paper}
              height="100%"
              p={10}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box mb={2}>
                <SentimentVeryDissatisfiedRounded color="inherit" />
              </Box>
              <Typography variant="body1" align="center">
                Ooops!
                <br />
                The API is down for the moment.
              </Typography>
            </Box>
          ) : (
            (stockProfile || stockSymbol) && (
              <ChartWrapper symbol={stockSymbol} profile={stockProfile} />
            )
          )}
        </Box>
        <Box minWidth={0}>
          {isError ? (
              <Box
                  component={Paper}
                  height="100%"
                  p={10}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
              >
                <Box mb={2}>
                  <SentimentVeryDissatisfiedRounded color="inherit" />
                </Box>
                <Typography variant="body1" align="center">
                  Ooops!
                  <br />
                  The API is down for the moment.
                </Typography>
              </Box>
          ) : (
              (stockProfile || stockSymbol) && (
                  <ChartWrapper symbol={stockSymbol} profile={stockProfile} />
              )
          )}
        </Box>
      </Box>
    </Container>
  )
}

export default App
