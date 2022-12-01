/* eslint-disable @typescript-eslint/unbound-method */
import { Button } from 'components/Button'
import { ChatsController } from 'controllers/ChatsController'
import { Block } from 'core/Block'
import template from './main.hbs'
import './main.less'
import './simple-image-fix.css'

type Props = {
  room?: ChatRoomHistory
}

export class ChatMain extends Block<Props> {
  constructor({ room }: Pick<Props, 'room'> = {}) {
    super({
      tag: 'section',
      className: 'chat-main',
    }, { room })
  }

  #value = ''

  #handleSend = () => {
    if (this.#value) {
      ChatsController.sendMessage(this.#value)
    } else if (process.env.NODE_ENV === 'development') {
      console.debug('Поле воода пустое. Сообщение не отправлено')
    }
  }

  #handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement
    this.#value = input.value
  }

  #showUsers(this: HTMLElement) {
    this.nextElementSibling?.classList.toggle('chat-main__users-list--show')
  }

  #removeUser(this: HTMLElement, event: MouseEvent) {
    const target = (event.target as HTMLElement | null)
    const el = target?.closest('button')
    if (el && this.contains(el) && el.dataset.user) {
      const userId = Number(el.dataset.user)
      ChatsController.removeUser(userId)
    }
  }

  #addUser() {
    ChatsController.addUser()
  }

  #button = new Button({
    content: 'Отправить',
    className: 'chat-main__message-send',
    onClick: this.#handleSend,
  })

  protected render() {
    return this.compile(template, {
      button: this.#button,
      handleInput: this.#handleInput,
      showUsers: this.#showUsers,
      removeUser: this.#removeUser,
      addUser: this.#addUser,
    })
  }
}