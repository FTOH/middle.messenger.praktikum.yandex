import { renderDom } from 'core/renderDom'
import { chatPage } from 'pages/Chat'
import { error404Page } from 'pages/Error404'
import { error500Page } from 'pages/Error500'
import { loginPage } from 'pages/Login'
import { registerPage } from 'pages/Register'
import { sitemapPage } from 'pages/Sitemap'

const rootPath = globalThis.location.pathname.match(/\/[a-z0-9.]*/i)?.[0]

if (process.env.NODE_ENV === 'development') {
  console.debug(`Opened page ${rootPath}`)
}

/**
 * Комментарии возле case используются для автоматического создания sitemap
 */
try {
  switch (rootPath) {
    case '/':
      renderDom('.app', sitemapPage)
      break
    case '/chat': // Чаты
      renderDom('.app', chatPage)
      break
    case '/login': // Авторизация
      renderDom('.app', loginPage)
      break
    case '/reg': // Регистрация
      renderDom('.app', registerPage)
      break
    case '/500': // Ошибка 500
      renderDom('.app', error500Page)
      break
    default:
      renderDom('.app', error404Page)
  }
} catch (error) {
  console.error(error)
  renderDom('.app', error500Page)
}
