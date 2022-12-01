import { Button } from 'components/Button'
import { Form } from 'components/Form/form'
import { TextField } from 'components/Textfield'
import { MainLayout } from 'layouts/MainLayout'
import { Block } from 'core/Block'
import { once } from 'utils/once'
import { Link } from 'components/Link'
import { AuthController } from 'controllers/AuthController'
import { Router } from 'core/Router'

export const LoginPage = once(() => {
  AuthController.getUser()
    .then(() => {
      Router().go('/messages')
    }, () => {})

  const loginField = new TextField({
    label: 'Логин',
    name: 'login',
    autocomplete: 'username',
  })
  const passwordField = new TextField({
    label: 'Пароль',
    name: 'password',
    type: 'password',
    autocomplete: 'current-password',
  })

  const submitButton = new Button({
    content: 'Войти',
    className: 'container__element--gap',
  })

  const link = new Link({
    text: 'Нет аккаунта? Зарегистрироваться',
    href: '/sign-up',
  })

  const form = new Form({
    header: 'Авторизация',
    rows: [
      loginField,
      passwordField,
      submitButton,
      link,
    ],
    onSubmit() {
      AuthController.login(form.getElements())
        .catch((error: string) => form.showError(error))
    },
  })

  return new MainLayout({ content: form as Block })
})
