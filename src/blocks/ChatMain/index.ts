import { UserData } from 'api/types'
import { connect } from 'utils/connect'
import { ChatMain } from './main'

function getReadableName(user: UserData) {
  const { display_name: dnOrNull, first_name: fn, second_name: sn } = user
  const dn = dnOrNull?.trim() ?? ''
  const name = dn || `${fn.trim()} ${sn.trim()}`.trim()

  return `${name} (@${user.login})`.trim()
}

export const ChatMainWithState = connect(ChatMain, (state) => {
  if (!state.selectedChatHistory) return
  const messages = state.selectedChatHistory

  return {
    room: {
      title: state.selectedChat?.title ?? 'noname',
      usersCount: state.selectedChatUsers?.length ?? -100,

      users: state.selectedChatUsers?.map((user) => ({
        id: user.id,
        name: getReadableName(user),
      })) ?? [],

      messages: messages.map((msg) => ({
        content: msg.content,
        sentByMe: msg.user_id === state.user?.id,
      })),
    },
  }
})
