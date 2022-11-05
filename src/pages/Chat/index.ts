import { ChatList } from 'components/ChatList'
import { ChatMain } from 'components/ChatMain'
import { Block } from 'core/Block'
import { ChatLayout } from 'layouts/ChatLayout'

const rooms: ChatRoomModel[] = [
  {
    photo: 'https://cataas.com/cat?type=sq&size=10&random=1',
    name: 'Мама',
    unreadCount: 2,
    messages: [],
    lastMessage: {
      sentByMe: false,
      date: '10:49',
      text: 'У тебя всё получится',
    },
  },
  {
    photo: 'https://cataas.com/cat?type=sq&size=10&random=2',
    name: 'Яндекс.Практикум',
    unreadCount: 0,
    messages: [],
    lastMessage: {
      sentByMe: false,
      date: '10:31',
      text: 'Ваш электронный чек',
    },
  },
  {
    photo: 'https://cataas.com/cat?type=sq&size=10&random=3',
    name: 'Кинопоиск',
    unreadCount: 0,
    messages: [],
    lastMessage: {
      sentByMe: false,
      date: 'ПН',
      text: 'Антон, дарконы вышли ебашь посты',
    },
  },
  {
    photo: 'https://cataas.com/cat?type=sq&size=10&random=4',
    name: 'Учеба',
    unreadCount: 0,
    messages: [{
      date: '10:48',
      sentByMe: false,
      text: 'Добавь в макет',
    }, {
      date: '10:49',
      sentByMe: false,
      text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quisquam
commodi assumenda ad in neque quibusdam esse quo cum quos, nisi eius minus adipisci,
necessitatibus fugit et corporis! Dolore, repellat?`.replaceAll('\n', ' '),
    }, {
      date: '10:59',
      sentByMe: true,
      text: 'Готово!',
    }],
    lastMessage: {
      sentByMe: true,
      date: 'ПТ',
      text: 'Готово!',
    },
  },
]

const side = new ChatList({ rooms }) as Block
const main = new ChatMain({ room: rooms[3] }) as Block

export const chatPage = new ChatLayout({ side, main })
