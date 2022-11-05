import { Block } from 'core/Block'
import template from './sitemap.hbs'

type Props = {
  links: { url: string, name: string }[]
}

export class SitemapPage extends Block<Props> {
  constructor({
    links = [],
  }: Props) {
    super({
      tag: 'main',
    }, { links })
  }

  protected render() {
    return this.compile(template)
  }
}
