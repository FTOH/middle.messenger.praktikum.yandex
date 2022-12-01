import { Block } from 'core/Block'
import template from './dropdown.hbs'
import './dropdown.less'

type Props = {
  text: string,
  items: { text: string, onClick: (event: MouseEvent) => void }[]
}

export class Dropdown extends Block<Props> {
  constructor(props: Props) {
    const handleClick = (event: MouseEvent) => {
      const { target } = event
      if (!(target && target instanceof HTMLAnchorElement)) return
      const { key } = target.dataset
      const { items } = this.props
      if (key === undefined || !(key in items)) return
      items[Number(key)].onClick(event)
    }

    super({
      tag: 'section',
      className: 'dropdown',
      parentEvents: {
        click: handleClick as EventListener,
      },
    }, props)
  }

  protected render() {
    return this.compile(template)
  }
}
