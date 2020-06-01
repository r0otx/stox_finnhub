import React, { FunctionComponent } from 'react'
import { Avatar, makeStyles } from '@material-ui/core'

import { TimelineRounded } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}))

export const SymbolAvatar: FunctionComponent<{
  src?: string
  iconFontSize?: 'default' | 'small' | 'inherit' | 'large'
  size?: number
}> = ({ src, iconFontSize, size }) => {
  const classnames = useStyles()
  const style = Number(size) >= 0 ? { width: size, height: size } : {}

  return (
    <Avatar
      src={src}
      classes={{
        root: Boolean(src) ? '' : classnames.avatar,
      }}
      style={style}
    >
      <TimelineRounded fontSize={iconFontSize} />
    </Avatar>
  )
}
