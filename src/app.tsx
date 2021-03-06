import React, {FunctionComponent, useEffect, useState} from 'react'
import {Box, Container, Paper, Typography, useTheme} from '@material-ui/core'

import {WatchList} from './components/watch-list/watch-list'
import {ChartWrapper} from './components/chart/chart-wrapper'
import {FinnhubStockProfile} from './finnhub-api/finnhub-api-types'

import {useSymbolsListLoad} from './app-hooks'
import {SentimentVeryDissatisfiedRounded} from '@material-ui/icons'

const App: FunctionComponent<{}> = () => {
    const theme = useTheme()

    const {options: symbolOptions} = useSymbolsListLoad()
    const [stockProfile, setStockProfile] = useState<FinnhubStockProfile>()
    const [stockSymbol, setStockSymbol] = useState<string>()
    const [isError, setIsError] = useState(false)

    const [stockProfile2, setStockProfile2] = useState([])
    useEffect(() => {
        if (stockProfile !== undefined) {
            // @ts-ignore
            setStockProfile2( [...stockProfile2, stockProfile])
        }
    }, [stockProfile])

    console.log(stockProfile2);

    return (
        <Container style={{flexGrow: 1}} maxWidth={false}>
            <Box
                py={2}
                display={'grid'}
                height="100%"
                gridColumnGap={theme.spacing(1)}
                gridRowGap={theme.spacing(1)}
                gridTemplateColumns={['1fr', '1fr', '3fr 5fr 5fr']}
                gridTemplateRows={['1fr', '1fr', 'max-content max-content max-content']}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    gridColumn={['1/1', '1/1', '1 / span 3']}
                    minWidth="0"
                >
                </Box>

                <Box flexGrow="1" minWidth="0" gridRow={['auto', 'auto', '2 / span 3']}>
                    <WatchList
                        symbolOptions={symbolOptions}
                        onSelectedItem={(symbol: string, profile?: FinnhubStockProfile): void => {
                            setStockSymbol(symbol)
                            setStockProfile(profile)
                        }}
                        onError={(): void => setIsError(true)}
                    />
                </Box>

                {stockProfile2.map(e =>
                    // @ts-ignore
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
                                    <SentimentVeryDissatisfiedRounded color="inherit"/>
                                </Box>
                                <Typography variant="body1" align="center">
                                    Ooops!
                                    <br/>
                                    The API is down for the moment.
                                </Typography>
                            </Box>
                        ) : (
                            (stockProfile || stockSymbol) && (
                                // @ts-ignore
                                <ChartWrapper symbol={e.ticker} profile={e}/>
                            )
                        )}
                    </Box>)}

            </Box>
        </Container>
    )
}

export default App
