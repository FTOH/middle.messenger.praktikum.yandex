import { Block } from 'core/Block'
import template from './main.hbs'
import './main.less'

type Props = {
  content: Block,
  backLink?: string,
}

export class MainLayout extends Block<Props> {
  constructor({
    content,
    backLink,
  }: Props) {
    super({
      tag: 'main',
      className: 'container',
    }, { content, backLink })
  }

  protected render() {
    return this.compile(template)
  }
}
