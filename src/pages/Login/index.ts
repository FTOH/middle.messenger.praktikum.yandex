import { Button } from 'components/Button'
import { Form } from 'components/Form/form'
import { TextField } from 'components/Textfield'
import { MainLayout } from 'layouts/MainLayout'
import { Block } from 'core/Block'

const loginField = new TextField({
  label: 'Логин',
  name: 'login',
})
const passwordField = new TextField({
  label: 'Пароль',
  name: 'password',
  type: 'password',
})
const submitButton = new Button({
  content: 'Войти',
  className: 'container__element--gap',
})

const form = new Form({
  header: 'Авторизация',
  rows: [
    loginField,
    passwordField,
    submitButton,
  ],
})

export const loginPage = new MainLayout({ content: form as Block })
