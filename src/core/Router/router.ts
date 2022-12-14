import { BlockBuilder } from 'core/Block'
import { once } from 'utils/once'
import { Route } from './route'
import { RouterScheme } from './scheme'

export const Router = once((rootQuery = '') => new class RouterSingleton {
  #rootQuery = rootQuery

  #routes: Route[] = []

  #history = window.history

  #currentRoute?: Route

  #fallbackRoute?: Route

  public use<T>(pathname: string, BlockClass: BlockBuilder<T>) {
    const route = new Route(pathname, BlockClass as BlockBuilder)
    this.#routes.push(route)
    return this
  }

  public useFallback<T>(BlockClass: BlockBuilder<T>) {
    const route = new Route('', BlockClass as BlockBuilder)
    this.#fallbackRoute = route
    return this
  }

  get #path() {
    const { pathname } = window.location
    return pathname
  }

  public start(startingRoute: string = this.#path) {
    window.onpopstate = () => {
      this.#onRoute(this.#path)
    }
    this.#onRoute(startingRoute)
  }

  #onRoute(url: string) {
    const route = this.#getRoute(url)
    if (!route) return

    if (process.env.NODE_ENV === 'development') {
      if (this.#currentRoute) {
        console.debug('Navigated to', url)
      }
    }

    this.#currentRoute?.leave()

    this.#currentRoute = route
    route.render(this.#rootQuery)
  }

  public go(url: RouterScheme) {
    if (this.#currentRoute?.match(url)) {
      return
    }
    this.#history.pushState(null, '', url)
    this.#onRoute(url)
  }

  public back() {
    this.#history.back()
  }

  public forward() {
    this.#history.forward()
  }

  public getRoutes() {
    return this.#routes
  }

  public interceptUserClicks(selector: string) {
    type ClickEvent = MouseEvent & {
      target: HTMLElement | null
    }
    function handler(event: ClickEvent) {
      const link = event.target?.closest<HTMLAnchorElement>(selector)
      if (!link?.href) return
      const { host, pathname } = new URL(link.href)
      if (host !== window.location.host) return

      event.preventDefault()
      Router().go(pathname as RouterScheme)
    }
    document.addEventListener('click', handler as EventListener)
    return this
  }

  #getRoute(pathname: string) {
    return this.#routes.find((route) => route.match(pathname)) ?? this.#fallbackRoute
  }
}())
