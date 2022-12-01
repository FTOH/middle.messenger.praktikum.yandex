import { Button } from 'components/Button'
import { ChatsController } from 'controllers/ChatsController'
import { Block } from 'core/Block'
import template from './side.hbs'
import './side.less'

type Props = {
  rooms: ChatRoomModel[]
}

export class ChatSide extends Block<Props> {
  constructor({
    rooms = [],
  }: Partial<Props> = {}) {
    super({
      tag: 'section',
      className: 'chat-side__outer',
    }, {
      rooms,
    })
  }

  #button = new Button({
    content: 'Создать новый чат',
    onClick() {
      ChatsController.createChat()
    },
  })

  #handleChatChoose = (event: Event) => {
    const el = (event.target as HTMLElement).closest('li')
    if (!el) return
    const id = Number(el.dataset.id)
    ChatsController.selectChat(id)
  }

  protected render() {
    return this.compile(template, {
      createChatButton: this.#button,
      handleChatChoose: this.#handleChatChoose,
    })
  }
}
