import React, { useState, useEffect, useCallback, FunctionComponent } from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert as MuiAlert } from '@material-ui/lab'

import { notifications, Notification } from '../../utils/notifications'

export const NotificationsWrapper: FunctionComponent<{}> = () => {
  const [notification, setNotification] = useState<Notification | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const sub = notifications.subscribe((next) => {
      setNotification(next)
      setOpen(true)
    })

    return (): void => sub.unsubscribe()
  }, [])

  const handleClose = useCallback((): void => {
    setOpen(false)
    setNotification(null)
  }, [notification])

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={notification?.type}
        >
          {notification?.message}
        </MuiAlert>
      </Snackbar>
    </>
  )
}
