import { Block } from 'core/Block'
import template from './list.hbs'
import './list.less'

type Props = {
  rooms: ChatRoomModel[]
}

export class ChatList extends Block<Props> {
  constructor({
    rooms = [],
  }: Props) {
    super({
      tag: 'section',
      className: 'chat-list__outer',
    }, {
      rooms,
    })
  }

  protected render() {
    return this.compile(template)
  }
}
