import { ChatsApi } from 'api/ChatsApi'
import { SocketApi } from 'api/SocketApi'
import { ChatRoom, SocketMessage, UserMessage } from 'api/types'
import { store } from 'core/Store'

function handleError(error: { reason?: string, message?: string }): void | never {
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw error.reason ?? error.message
}

export const ChatsController = new class ChatsController {
  #api = new ChatsApi()

  #socket = new SocketApi()

  #chatId = 0

  public getChats() {
    this.#api.getChats().then((chats) => {
      store.set('chats', chats)
      this.#initChatsById(chats)
    }).catch(handleError)
  }

  #initChatsById(chats: ChatRoom[]) {
    const mapChats: Record<number, ChatRoom> = {}
    chats.forEach((chat) => {
      mapChats[chat.id] = chat
    })
    store.set('chatsById', mapChats)
  }

  public createChat() {
    // eslint-disable-next-line no-alert
    const title = prompt('Имя чата')
    if (!title?.trim()) return

    this.#api.createChat({ title })
      .then(() => this.getChats())
      .catch(handleError)
  }

  public selectChat(chatId: number) {
    const chat = store.getState().chatsById?.[chatId]
    if (chat) {
      if (process.env.NODE_ENV === 'development') {
        window.location.hash = `${chatId}`
      }
      this.#chatId = chatId

      store.set('selectedChat', chat)
      store.set('selectedChatHistory', [])
      store.set('selectedChatUsers', [])

      const userId = store.getState().user?.id ?? 0
      this.#connectToChat(userId, chatId)
      this.#getChatUsers(chatId)
    }
  }

  #connectToChat(userId: number, chatId: number) {
    this.#socket.connectToChat(userId, chatId).then(() => {
      if (this.#getSelectedChat() === chatId) {
        this.#socket.sendToChat('get old', '0')
        this.#socket.onMessage((msg) => {
          if (this.#getSelectedChat() === chatId) {
            this.#handeSocketMessages(chatId, msg)
          }
        })
      }
    }).catch((error) => {
      if (process.env.NODE_ENV === 'development') {
        if (this.#getSelectedChat() !== chatId) {
          console.debug('[Socket] Connection prevented by user')
        } else {
          console.error('[Socket] Error while connecting to server', error)
        }
      }
    })
  }

  #getChatUsers(chatId: number) {
    this.#api.getChatUsers(chatId)
      .then((users) => {
        store.set('selectedChatUsers', users)
      }).catch((error: { reason?: string }) => {
        if (error.reason === 'No chat') {
          window.location.reload()
        }
      })
  }

  #getSelectedChat() {
    return store.getState().selectedChat?.id ?? 0
  }

  public sendMessage(text: string) {
    this.#socket.sendToChat('message', text)
  }

  #addMessageToChatHistory(msg: UserMessage) {
    const { selectedChatHistory: messages = [] } = store.getState()
    store.set('selectedChatHistory', messages.concat(msg))
  }

  #updateLastMessageInChatList(chatId: number, msg: UserMessage) {
    const chat = store.getState().chatsById?.[chatId]
    if (chat) {
      const user = store.getState().selectedChatUsers?.find((e) => e.id === msg.user_id)
      if (!user) return
      const {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        first_name, second_name, avatar, email, login, phone,
      } = user

      chat.last_message = {
        content: msg.content,
        time: new Date(msg.time),
        user: {
          first_name, second_name, avatar: avatar ?? '', email, login, phone,
        },
      }
      store.set(`chatsById.${chatId}`, chat)
    }
  }

  #handeSocketMessages(chatId: number, msg: SocketMessage) {
    if (Array.isArray(msg)) {
      store.set('selectedChatHistory', msg.reverse())
      return
    }
    switch (msg.type) {
      case 'pong': break
      case 'message':
      case 'file':
      case 'sticker':
        this.#addMessageToChatHistory(msg)
        this.#updateLastMessageInChatList(chatId, msg)
        break

      default:
        console.error('Unknown message type', msg)
    }
  }

  public addUser() {
    // eslint-disable-next-line no-alert
    const id = parseInt(window.prompt('Введите ID пользователя') ?? '', 10)
    if (!id) return

    this.#api.addUsers(this.#chatId, [id])
      .then(() => {
        this.#getChatUsers(this.#chatId)
      }).catch(console.error)
  }

  public removeUser(userId: number) {
    this.#api.removeUsers(this.#chatId, [userId])
      .then(() => {
        this.#getChatUsers(this.#chatId)
      }).catch(console.error)
  }
}()
