import { HTTPTransport } from 'core/HttpTransport'
import { SocketMessage } from './types'

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats/token/')

const WS_URL = 'wss://ya-praktikum.tech/ws/chats/'

type DataWithToken = { token: string }

export class SocketApi {
  #timer?: NodeJS.Timeout

  #setPing() {
    // skip first call
    if (this.#timer) this.sendToChat('ping')
    this.#timer = setTimeout(() => this.#setPing(), 45000)
  }

  #clearPing() {
    clearTimeout(this.#timer)
    this.#timer = undefined
  }

  #heartbeat() {
    if (this.#timer) {
      this.#clearPing()
      this.#setPing()
    }
  }

  #socket?: WebSocket

  public connectToChat(userId: number, chatId: number) {
    this.disconnect()

    return http.post<DataWithToken>(String(chatId))
      .then(({ token }) => (
        this.#connectWS(userId, chatId, token)
      )).then((res: unknown) => {
        this.#setPing()

        if (process.env.NODE_ENV === 'development') {
          console.debug('[Socket] Connected for chat', chatId)
        }
        return res
      })
  }

  #connectWS(userId: number, chatId: number, token: string) {
    this.#socket = new WebSocket(`${WS_URL}${userId}/${chatId}/${token}`)
    this.#socket.onclose = () => this.disconnect()

    return this.#waitOpenOrError(this.#socket)
  }

  #waitOpenOrError(socket: WebSocket) {
    return new Promise((resolve, reject) => {
      let errorHandler: EventListener
      const openHandler: EventListener = (event) => {
        resolve(event)
        socket.removeEventListener('error', errorHandler)
      }
      errorHandler = (event) => {
        reject(event)
        socket.removeEventListener('open', openHandler)
      }
      socket.addEventListener('open', openHandler, { once: true })
      socket.addEventListener('error', errorHandler, { once: true })
    })
  }

  public onMessage(callback: (data: SocketMessage) => unknown) {
    if (this.#socket) {
      this.#socket.onmessage = ({ data }) => {
        callback(JSON.parse(data as string) as SocketMessage)
      }
    }
  }

  public sendToChat(type: string, content?: string) {
    this.#socket?.send(JSON.stringify({
      type, content,
    }))
    this.#heartbeat()
  }

  public disconnect() {
    const socket = this.#socket
    if (socket) {
      this.#socket = undefined
      socket.close()
      socket.onmessage = null
      if (process.env.NODE_ENV === 'development') {
        console.debug('[Socket] Disconnected')
      }
    }
    this.#clearPing()
  }
}
