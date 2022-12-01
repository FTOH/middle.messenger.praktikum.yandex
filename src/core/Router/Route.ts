import { Block, BlockBuilder } from 'core/Block'
import { renderDom } from 'utils/renderDom'

export class Route {
  #block?: Block

  #BlockClass: BlockBuilder

  constructor(readonly pathname: string, BlockClass: BlockBuilder) {
    this.#BlockClass = BlockClass
  }

  get #name() {
    return this.#block?.blockName ?? 'unknown'
  }

  public leave() {
    this.#block?.unmount()
  }

  public match(url: string) {
    const [pathname] = url.split('?')
    return !pathname || pathname === this.pathname
  }

  public getBlock() {
    return this.#block
  }

  public render(rootQuery: string) {
    if (!this.#block) {
      this.#block = this.#BlockClass()
    }

    if (process.env.NODE_ENV === 'development') {
      console.debug(`Resolved to route «${this.#name}»`)
    }
    renderDom(rootQuery, this.#block)
  }
}
