import { ChatRoom, UserData, UserMessage } from 'api/types'
import { EventBus } from 'core/EventBus'
import { set } from 'utils/set'

type StoreEvents = 'update'

export type StoreState = {
  user?: UserData,
  chats?: ChatRoom[],
  chatsById?: Record<number, ChatRoom>,
  selectedChat?: ChatRoom
  selectedChatHistory?: UserMessage[]
  selectedChatUsers?: UserData[]
}

class Store extends EventBus<StoreEvents> {
  #state: StoreState = {}

  public getState(): Readonly<StoreState> {
    return this.#state
  }

  public clear() {
    this.#state = {}
    this.emit('update')
    return this
  }

  public set(path: keyof StoreState | `${keyof StoreState}.${string}`, value: unknown) {
    set(this.#state, path, value)
    this.emit('update')
    return this
  }
}

export const store = new Store()
