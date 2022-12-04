import { HTTPTransport } from 'core/HttpTransport'
import defaultProfile from '../assets/defaultprofile.svg'
import {
  ChatRoom, ChatRoomCreate, LastMessageUparsed, UserData,
} from './types'

const RESOURCES = 'https://ya-praktikum.tech/api/v2/resources/'
const http = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats/')

export class ChatsApi {
  public getChats(): Promise<ChatRoom[]> {
    return http.get<ChatRoom<LastMessageUparsed>[]>('')
      .then((chats) => (
        chats.map<ChatRoom>((chat) => {
          if (chat.avatar) chat.avatar = RESOURCES + chat.avatar
          else chat.avatar = defaultProfile
          if (chat.last_message) {
            chat.last_message.time = new Date(chat.last_message.time)
          }
          return chat as ChatRoom
        })
      ))
  }

  public createChat(chat: ChatRoomCreate) {
    return http.post('', {
      data: chat,
    })
  }

  public getChatUsers(chatId: number) {
    return http.get<UserData[]>(`${chatId}/users`, {
      data: {
        limit: 1000,
      },
    })
  }

  public addUsers(chatId: number, users: number[]) {
    return http.put('users', {
      data: {
        users, chatId,
      },
    })
  }

  public removeUsers(chatId: number, users: number[]) {
    return http.delete('users', {
      data: {
        users, chatId,
      },
    })
  }
}
