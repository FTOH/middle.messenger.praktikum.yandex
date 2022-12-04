import { ErrorLayout } from 'layouts/ErrorLayout'
import { once } from 'utils/once'

export const Error500Page = once(() => new ErrorLayout({
  header: 'Ошибка сервера',
  errorCode: 500,
}))
