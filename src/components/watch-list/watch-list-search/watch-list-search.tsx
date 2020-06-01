import React, { FunctionComponent, ReactElement, useRef } from 'react'
import { Box, Typography, InputBase, InputBaseComponentProps, useTheme } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'

import { FinnhubSymbol } from '../../../finnhub-api/finnhub-api-types'

const filterOptions = createFilterOptions<FinnhubSymbol>({
  limit: 20,
})

export const WatchListSearch: FunctionComponent<{
  options: FinnhubSymbol[]
  onSelect: (symbol: string) => void
}> = ({ options, onSelect }) => {
  const theme = useTheme()
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null)

  return (
    <Box>
      <Autocomplete
        options={options}
        filterOptions={filterOptions}
        getOptionLabel={({ symbol, description }): string => `${symbol} ${description}`}
        size="small"
        clearOnBlur
        fullWidth
        value={null}
        onChange={(event, option): void => {
          if (option) {
            onSelect(option.symbol)
          }

          autocompleteInputRef.current?.blur()
        }}
        renderOption={({ symbol, description }: FinnhubSymbol): ReactElement => {
          return (
            <Box display="flex" width="100%" alignItems="center">
              <Box minWidth={0} flexGrow={0} flexShrink={0} mr={2} width={60}>
                <Typography variant="body1" noWrap>
                  <strong>{symbol}</strong>
                </Typography>
              </Box>
              <Box minWidth={0} flexGrow={1}>
                <Typography variant="body2" noWrap>
                  {description}
                </Typography>
              </Box>
            </Box>
          )
        }}
        renderInput={({ inputProps, InputProps }): ReactElement => {
          autocompleteInputRef.current =
            (inputProps as InputBaseComponentProps)?.ref?.current ?? null

          return (
            <Box>
              <InputBase
                {...InputProps}
                fullWidth
                inputProps={{ ...inputProps }}
                placeholder="Watch symbol"
                startAdornment={
                  <Box mr={2}>
                    <Search fontSize="small" color="action" />
                  </Box>
                }
                style={{ paddingRight: theme.spacing(8) }}
              />
            </Box>
          )
        }}
      />
    </Box>
  )
}
