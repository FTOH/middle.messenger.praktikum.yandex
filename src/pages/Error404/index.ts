import { ErrorLayout } from 'layouts/ErrorLayout'
import { once } from 'utils/once'

export const Error404Page = once(() => new ErrorLayout({
  header: 'Страница не найдена',
  errorCode: 404,
}))
