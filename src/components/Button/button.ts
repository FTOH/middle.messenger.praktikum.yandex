import { Block } from 'core/Block'
import './button.less'

type Content = string | Node | (string | Node)[]

type Props = {
  content: Content,
}

export class Button extends Block<Props> {
  constructor({
    content = '' as Content,
    className = '',
    onClick = (() => {}) as EventListener,
  }) {
    super({
      tag: 'button',
      className: `button ${className}`,
      parentEvents: {
        click: onClick,
      },
    }, { content })
  }

  protected override render() {
    return this.props.content
  }
}
