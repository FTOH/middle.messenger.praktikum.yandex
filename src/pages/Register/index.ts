import { Button } from 'components/Button'
import { Form } from 'components/Form/form'
import { TextField } from 'components/Textfield'
import { MainLayout } from 'layouts/MainLayout'
import { Block } from 'core/Block'

const emailField = new TextField({
  label: 'Почта',
  name: 'email',
})
const loginField = new TextField({
  label: 'Логин',
  name: 'login',
})
const firstNameField = new TextField({
  label: 'Имя',
  name: 'first_name',
  validatorName: 'name',
})
const secondNameField = new TextField({
  label: 'Фамилия',
  name: 'second_name',
  validatorName: 'name',
})
const phoneField = new TextField({
  label: 'Номер телефона',
  name: 'phone',
})
const passwordField = new TextField({
  label: 'Пароль',
  name: 'password',
  type: 'password',
})
const repeatPasswordField = new TextField({
  label: 'Пароль (ещё раз)',
  name: 'password',
  type: 'password',
  customValidator(value: string) {
    if (passwordField.props.value !== value) {
      return 'Пароли не совпадают'
    }
  },
})
const submitButton = new Button({
  content: 'Войти',
  className: 'container__element--gap',
})

const form = new Form({
  header: 'Регистрация',
  rows: [
    emailField,
    loginField,
    firstNameField,
    secondNameField,
    phoneField,
    passwordField,
    repeatPasswordField,
    submitButton,
  ],
})

export const registerPage = new MainLayout({ content: form as Block })
