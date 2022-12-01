import { ChatMainWithState } from 'blocks/ChatMain'
import { ChatSideWithState } from 'blocks/ChatSide'
import { ChatsController } from 'controllers/ChatsController'
import { Block } from 'core/Block'
import { ChatLayout } from 'layouts/ChatLayout'
import { once } from 'utils/once'

export const ChatPage = once(() => {
  ChatsController.getChats()

  const side = new ChatSideWithState() as Block
  const main = new ChatMainWithState() as Block

  return new ChatLayout({ side, main })
})
