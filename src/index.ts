import { Router, RouterScheme } from 'core/Router'
import { ChatPage } from 'pages/Chat'
import { EditPasswordPage } from 'pages/EditPassword'
import { EditProfilePage } from 'pages/EditProfile'
import { Error404Page } from 'pages/Error404'
import { Error500Page } from 'pages/Error500'
import { LoginPage } from 'pages/Login'
import { ProfilePage } from 'pages/Profile'
import { RegisterPage } from 'pages/Register'
import { SitemapPage } from 'pages/Sitemap'
import { is3rdPartyCookieAllowed } from 'utils/is3rdPartyCookieAllowed'
import './styles/common.less'

is3rdPartyCookieAllowed().then((result) => {
  if (!result) {
    window.location.href = '/blockedcookies.html'
  }
}).catch(console.error)

if (process.env.NODE_ENV === 'development') {
  console.debug('Opened page', window.location.pathname)
}

Router('.app')
  .use(RouterScheme.LOGIN, LoginPage)
  .use(RouterScheme.REGISTER, RegisterPage)
  .use(RouterScheme.MESSENGER, ChatPage)
  .use(RouterScheme.PROFILE, ProfilePage)
  .use(RouterScheme.SETTINGS, EditProfilePage)
  .use(RouterScheme.CHANGE_PASSWORD, EditPasswordPage)
  .use('/sitemap', SitemapPage)
  .use('/404', Error404Page)
  .use('/500', Error500Page)
  .interceptUserClicks('a')
  .useFallback(Error404Page)

Router().start()
