import numeral from 'numeral'
import { format as dateFormat, fromUnixTime, getUnixTime } from 'date-fns'
import { round, merge } from 'lodash'

const DEFAULT_CURRENCY = 'USD'

export const getNumeralFormatter = (format = '0a') => (n: number): string =>
  numeral(n).format(format)

export const getCurrencyFormatter = (precision = 2, currency = DEFAULT_CURRENCY) => (
  n: number,
): string => {
  const currencyConfig = {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }

  const roundedValue = round(n, precision)

  try {
    return roundedValue.toLocaleString('en', merge({ currency, style: 'currency' }, currencyConfig))
  } catch (error) {
    return roundedValue.toLocaleString('en', merge({}, currencyConfig))
  }
}

export const getTimestampFormatter = (format = 'MMM d, yyyy - HH:mm:ss') => (
  timestamp: number,
): string =>
  dateFormat(fromUnixTime(isFinite(timestamp) ? timestamp : getUnixTime(new Date())), format)
