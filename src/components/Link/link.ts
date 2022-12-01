import { Block, RootTag } from 'core/Block'
import './link.less'

type Props = {
  text: string,
}

type InputProps = {
  text: string,
  href?: string,
  onClick?: (event: MouseEvent) => void,
  dangerous?: boolean,
}

export class Link extends Block<Props> {
  constructor({
    text,
    href,
    onClick,
    dangerous,
  }: InputProps) {
    const root = {
      tag: 'a',
      className: 'link',
    } as Partial<RootTag>

    if (href) root.attr = { href }
    if (onClick) root.parentEvents = { click: onClick as EventListener }
    if (dangerous) root.className += ' link--dangerous'

    super(root, { text })
  }

  protected render() {
    return this.props.text
  }
}
