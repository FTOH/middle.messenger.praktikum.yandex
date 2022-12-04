import { Block } from 'core/Block'
import template from './sitemap.hbs'
import './sitemap.less'

type Props = {
  routes: { pathname: string }[]
}

export class SitemapPageView extends Block<Props> {
  constructor({
    routes = [],
  }: Props) {
    super({
      tag: 'main',
    }, { routes })
  }

  protected render() {
    return this.compile(template)
  }
}
