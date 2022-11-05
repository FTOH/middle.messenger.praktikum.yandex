import { Block } from 'core/Block'
import template from './main.hbs'
import './main.less'

type Props = {
  content: Block
}

export class MainLayout extends Block<Props> {
  constructor({
    content,
  }: Props) {
    super({
      tag: 'main',
      className: 'container',
    }, { content })
  }

  protected render() {
    return this.compile(template)
  }
}
