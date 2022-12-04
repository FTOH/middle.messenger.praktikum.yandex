import { Router } from 'core/Router'
import { Route } from 'core/Router/route'
import { once } from 'utils/once'
import { SitemapPageView } from './sitemap'

const startsWithSlash = (route: Route) => route.pathname.startsWith('/')

export const SitemapPage = once(() => new SitemapPageView({
  routes: Router().getRoutes().filter(startsWithSlash),
}))
