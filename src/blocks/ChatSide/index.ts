import { connect } from 'utils/connect'
import { ChatSide } from './side'

function getWeek(time: Date) {
  const f = Intl.DateTimeFormat(undefined, { weekday: 'short' })
  return f.format(time).toUpperCase()
}

function toReadableTime(time: Date) {
  let elapsed = (Date.now() - time.getTime()) / 1000
  elapsed = Math.round(elapsed)
  if (elapsed < 60 /* seconds */) return `${elapsed}с`
  elapsed /= 60
  elapsed = Math.round(elapsed)
  if (elapsed < 60 /* minutes */) return `${elapsed}мин`
  elapsed /= 60
  elapsed = Math.round(elapsed)
  if (elapsed < 16 /* hours */) return `${time.getHours()}:${time.getMinutes()}`
  elapsed /= 24
  elapsed = Math.round(elapsed)
  if (elapsed < 7 /* 1 week */) return getWeek(time)
  if (elapsed < 340 /* ≈ 1 year */) return `${time.getDate()}.${time.getMonth()}`
  return `${time.getDate()}:${time.getMonth()}.${time.getFullYear()}`
}

export const ChatSideWithState = connect(ChatSide, (state) => {
  if (!state.chats) return
  return {
    rooms: state.chats.map((chat) => {
      const room: ChatRoomModel = {
        id: chat.id,
        selected: state.selectedChat?.id === chat.id,
        name: chat.title,
        photo: chat.avatar,
        unreadCount: chat.unread_count,
      }
      if (chat.last_message) {
        const lm = chat.last_message
        room.lastMessage = {
          text: lm.content,
          time: toReadableTime(lm.time),
          sentByMe: lm.user.login === state.user?.login,
        }
      }
      return room
    }),
  }
})
