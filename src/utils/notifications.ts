import { Subject } from 'rxjs'

export enum NotificationTypes {
  info = 'info',
  error = 'error',
  warning = 'warning',
  success = 'success',
}

export type Notification = {
  type: NotificationTypes
  message: string
}

export const notifications = new Subject<Notification>()

const send = (message: string, type: NotificationTypes): void =>
  notifications.next({ type, message })

export const notify = {
  info: (message: string): void => send(message, NotificationTypes.info),
  error: (message: string): void => send(message, NotificationTypes.error),
  warning: (message: string): void => send(message, NotificationTypes.warning),
  success: (message: string): void => send(message, NotificationTypes.success),
}
