import { ErrorLayout } from 'layouts/ErrorLayout'

export const error500Page = new ErrorLayout({
  header: 'Ошибка сервера',
  errorCode: 500,
})
