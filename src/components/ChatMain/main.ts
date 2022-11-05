import { Button } from 'components/Button'
import { Block } from 'core/Block'
import template from './main.hbs'
import './main.less'

type Props = {
  room: ChatRoomModel,
  handleFocusBlur: EventListener,
}

export class ChatMain extends Block<Props> {
  #value = ''

  #handleSend = (_event: Event) => {
    if (this.#value) {
      // eslint-disable-next-line no-console
      console.log('Сообщение отправлено', { message: this.#value })
    } else {
      // eslint-disable-next-line no-console
      console.log('Поле воода пустое. Сообщение не отправлено')
    }
  }

  constructor({ room }: Pick<Props, 'room'>) {
    let self: ChatMain | null = null

    super({
      tag: 'section',
      className: 'chat-main',
    }, {
      room,
      handleFocusBlur(event: Event) {
        const input = event.target as HTMLInputElement
        if (self) self.#value = input.value
      },
    })

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    self = this
    this.#button = this.#createButton()
  }

  #button: Button

  #createButton() {
    return new Button({
      content: 'Отправить',
      className: 'chat-main__message-send',
      events: {
        click: this.#handleSend,
      },
    })
  }

  protected render() {
    return this.compile(template, {
      button: this.#button,
    })
  }
}
