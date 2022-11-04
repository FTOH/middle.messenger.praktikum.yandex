export type Validator = (value: string) => string | void
type ValidationType = 'login' | 'password' | 'name' | 'email' | 'phone' | 'none'
type ValidationRule = {
  type: string,
  value: string,
}

const validateLogin: Validator = (value) => {
  if (value.length < 3) {
    return 'Слишком короткий'
  }

  if (value.length > 20) {
    return 'Слишком длинный'
  }

  if (/^\d+$/.test(value)) {
    return 'Не только цифры'
  }

  if (/[^\w\d_-]/i.test(value)) {
    return 'Можно A-Z, цифры, «_» и «-»'
  }
}

const validatePassword: Validator = (value) => {
  if (value.length < 8) {
    return 'Слишком короткий'
  }

  if (value.length > 40) {
    return 'Слишком длинный'
  }

  if (!/\p{Uppercase_Letter}/u.test(value)) {
    return 'Минимум 1 заглавная'
  }

  if (!/\d/.test(value)) {
    return 'Минимум 1 цифра'
  }
}

const validateName: Validator = (value) => {
  if (/\s|\d/.test(value)) {
    return 'Без пробелов и цифр'
  }

  if (/[^\wа-яё-]/.test(value)) {
    if (/\P{Letter}/u.test(value.replaceAll('-', ''))) {
      return 'Без спецсимволов'
    }
    return 'Латиница или кириллица'
  }

  if (/\P{Uppercase_Letter}/u.test(value[0])) {
    return 'Первая — заглавная'
  }
}

const validateEmail: Validator = (value) => {
  if (/[^\w\d@.-]/i.test(value)) {
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

  if (!/\w\.\w/.test(value)) {
    return 'Неправильный домен'
  }
}

const validatePhone: Validator = (value) => {
  if (/[^\d+]/.test(value)) {
    return 'Только цифры'
  }

  if (/[^\d]/.test(value.slice(1))) {
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
): string | void => {
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

export const validateInput = (rules: ValidationRule[]): string | void => {
  for (const rule of rules) {
    const error = validateByType(rule.type, rule.value)
    if (error) return error
  }
}
