declare module '*.less'
declare module '*.hbs' {
  const template: (context: Record<string, unknown>) => string
  export default template
}

type InputType =
  | 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file'
  | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset'
  | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'

type MessageModel = {
  text: string,
  sentByMe: boolean,
  date: string,
  attachment?: string
}

type ChatRoomModel = {
  name: string,
  photo: string,
  messages: MessageModel[],
  lastMessage?: MessageModel,
  unreadCount: number,
}
