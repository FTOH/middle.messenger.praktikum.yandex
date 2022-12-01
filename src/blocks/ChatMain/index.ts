import { UserData } from 'api/types'
import { connect } from 'utils/connect'
import { ChatMain } from './main'

function getReadableName(user: UserData) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { display_name, first_name, second_name } = user
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const name = display_name || `${first_name.trim()} ${second_name.trim()}`

  return `${name.trim()} (@${user.login})`
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
