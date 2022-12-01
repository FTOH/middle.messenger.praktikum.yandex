export type Validator = (value: string) => string | undefined
export type ValidationType = 'login' | 'password' | 'name' | 'email' | 'phone' | 'none'

/* LOGIN */
const ONLY_NUMBERS = /^\d+$/
const CONTAINS_NON_LOGIN_SYMBOLS = /[^\w\d_-]/i
const validateLogin: Validator = (value) => {
  if (value.length < 3) {
    return 'Слишком короткий'
  }

  if (value.length > 20) {
    return 'Слишком длинный'
  }

  if (ONLY_NUMBERS.test(value)) {
    return 'Не только цифры'
  }

  if (CONTAINS_NON_LOGIN_SYMBOLS.test(value)) {
    return 'Можно A-Z, цифры, «_» и «-»'
  }
}

/* PASSWORD */
const CONTAINS_UPPERCASE = /\p{Uppercase_Letter}/u
const CONTAINS_NUMBERS = /\d/
const validatePassword: Validator = (value) => {
  if (value.length < 8) {
    return 'Слишком короткий'
  }

  if (value.length > 40) {
    return 'Слишком длинный'
  }

  if (!CONTAINS_UPPERCASE.test(value)) {
    return 'Минимум 1 заглавная'
  }

  if (!CONTAINS_NUMBERS.test(value)) {
    return 'Минимум 1 цифра'
  }
}

/* NAME */
const CONTAINS_NUMBERS_OR_SPACES = /\s|\d/
const CONTAINS_NON_LETTERS = /\P{Letter}/u
const CONTAINS_LOWERCASE = /\P{Uppercase_Letter}/u
const validateName: Validator = (value) => {
  if (CONTAINS_NUMBERS_OR_SPACES.test(value)) {
    return 'Без пробелов и цифр'
  }

  if (CONTAINS_NON_LETTERS.test(value.replaceAll('-', ''))) {
    return 'Без спецсимволов'
  }

  if (CONTAINS_LOWERCASE.test(value[0])) {
    return 'Первая — заглавная'
  }
}

/* E-MAIL */
const CONTAINS_NON_LATIN = /[^\w\d@.-]/i
const CONTAINS_DOT_IN_DOMAIN = /\w\.\w/
const validateEmail: Validator = (value) => {
  if (CONTAINS_NON_LATIN.test(value)) {
    return 'Только латиница'
  }

  if (!value.includes('@')) {
    return 'Нет символа @'
  }

  const [name, domain, rest] = value.split('@')
  if (typeof rest !== 'undefined') {
    return 'Только 1 символ @'
  }

  if (!name) {
    return 'Нет логина'
  }

  if (!domain) {
    return 'Нет домена'
  }

  if (!CONTAINS_DOT_IN_DOMAIN.test(value)) {
    return 'Неправильный домен'
  }
}

/* PHONE */
const CONTAINS_NON_NUMBERS_EXCEPT_PLUS = /[^\d+]/
const CONTAINS_NON_NUMBERS = /[^\d]/
const validatePhone: Validator = (value) => {
  if (CONTAINS_NON_NUMBERS_EXCEPT_PLUS.test(value)) {
    return 'Только цифры'
  }

  if (CONTAINS_NON_NUMBERS.test(value.slice(1))) {
    return 'Плюс в начале'
  }

  if (value.length < 10) {
    return 'Слишком короткий'
  }

  if (value.length > 15) {
    return 'Слишком длинный'
  }
}

export const validateByType = (
  type: string,
  value: string,
): string | undefined => {
  switch (type.toLowerCase() as ValidationType) {
    case 'login':
      return validateLogin(value)
    case 'password':
      return validatePassword(value)
    case 'name':
      return validateName(value)
    case 'email':
      return validateEmail(value)
    case 'phone':
      return validatePhone(value)
    case 'none':
      return
    default:
      throw new Error(`Неизвестный тип валидатора ${type}. Значение: ${value}`)
  }
}
