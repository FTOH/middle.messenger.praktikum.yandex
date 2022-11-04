import { Block } from 'core/Block'
import template from './chat.hbs'
import './chat.less'

type Props = {
  side: Block,
  main: Block
}

export class ChatLayout extends Block {
  constructor({
    side,
    main,
  }: Props) {
    super({
      tag: 'main',
    }, {
      side, main,
    })
  }

  protected render() {
    return this.compile(template)
  }
}
