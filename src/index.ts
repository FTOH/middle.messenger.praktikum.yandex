/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'core/Router'
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

is3rdPartyCookieAllowed().then((result) => {
  if (!result) {
    window.location.href = '/blockedcookies.html'
  }
}).catch(console.error)

function handleLinkClicks(event: MouseEvent) {
  if (!event.target) return
  const link = (event.target as HTMLElement).closest('a')
  if (!link?.href) return
  const { host, pathname } = new URL(link.href)
  if (host !== window.location.host) return

  event.preventDefault()
  Router().go(pathname)
}
document.addEventListener('click', handleLinkClicks)

if (process.env.NODE_ENV === 'development') {
  console.debug('Opened page', window.location.pathname)
}

Router('.app')
  .use('/', LoginPage)
  .use('/sign-up', RegisterPage)
  .use('/messages', ChatPage)
  .use('/profile', ProfilePage)
  .use('/profile/edit', EditProfilePage)
  .use('/profile/password', EditPasswordPage)
  .use('/sitemap', SitemapPage)
  .use('/404', Error404Page)
  .use('/500', Error500Page)
  .useFallback(Error404Page)

Router().start()
