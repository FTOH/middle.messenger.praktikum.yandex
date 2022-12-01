export type LoginData = {
  login: string,
  password: string,
}

export type UserData = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string | null,
  login: string,
  avatar: string | null,
  email: string,
  phone: string,
}

export type RegisterData = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string,
}

export type ProfileData = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
}

export type ChangePasswordData = {
  oldPassword: string,
  newPassword: string,
}

export type ChatRoom<T extends LastMessageUparsed | LastMessage = LastMessage> = {
  id: number,
  title: string,
  created_by: number,
  avatar: string,
  unread_count: number,
  last_message: T | null,
}

export type LastMessageUparsed = {
  user: LastMessageUser,
  time: string | Date,
  content: string,
}

export type LastMessage = {
  user: LastMessageUser,
  time: Date,
  content: string,
}

export type LastMessageUser = {
  first_name: string,
  second_name: string,
  avatar: string,
  email: string,
  login: string,
  phone: string,
}

export type ChatRoomCreate = {
  title: string
}

type ChatBaseMessage = {
  chat_id: number,
  time: string | Date,
  user_id: number,
  content: string,
}

type ChatFile = {
  id: number,
  user_id: number,
  path: string,
  filename: string,
  content_type: string,
  content_size: number,
  upload_date: string,
}

export type UserMessage =
| (ChatBaseMessage & { type: 'message' })
| (ChatBaseMessage & { type: 'file' | 'sticker', file: ChatFile })

export type SocketMessage =
| UserMessage
| UserMessage[]
| { type: 'pong' }
