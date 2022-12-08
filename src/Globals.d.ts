declare module '*.svg' {
  const path: string
  export = path
}
declare module '*.jpg' {
  const path: string
  export = path
}
declare module '*.less'
declare module '*.hbs' {
  const template: (context: Record<string, unknown>) => string
  export default template
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
  }
}

type InputTypeAttr =
  | 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file'
  | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset'
  | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'

type InputAutocompleteAttr =
  | 'section' | 'shipping' | 'billing' | 'home' | 'work' | 'mobile' | 'fax' | 'pager'
  | 'webauthn' | 'off' | 'on' | 'name' | 'honorific-prefix' | 'given-name' | 'additional-name'
  | 'family-name' | 'honorific-suffix' | 'nickname' | 'organization-title' | 'username'
  | 'new-password' | 'current-password' | 'one-time-code' | 'organization' | 'street-address'
  | 'address-line1' | 'address-line2' | 'address-line3' | 'address-level4' | 'address-level3'
  | 'address-level2' | 'address-level1' | 'country' | 'country-name' | 'postal-code' | 'cc-name'
  | 'cc-given-name' | 'cc-additional-name' | 'cc-family-name' | 'cc-number' | 'cc-exp'
  | 'cc-exp-month' | 'cc-exp-year' | 'cc-csc' | 'cc-type' | 'transaction-currency'
  | 'transaction-amount' | 'language' | 'bday' | 'bday-day' | 'bday-month' | 'bday-year'
  | 'sex' | 'url' | 'photo' | 'tel' | 'tel-country-code' | 'tel-national' | 'tel-area-code'
  | 'tel-local' | 'tel-local-prefix' | 'tel-local-suffix' | 'tel-extension' | 'email' | 'impp'

type MessageModel = {
  text: string,
  sentByMe: boolean,
  time: string,
  attachment?: string
}

type ChatRoomModel = {
  id: number,
  selected: boolean,
  name: string,
  photo: string,
  lastMessage?: MessageModel,
  unreadCount: number,
}

type ChatRoomHistory = {
  title: string,
  usersCount: number,
  users: { id:number, name: string }[],
  messages: {
    content: string,
    sentByMe: boolean,
  }[]
}
