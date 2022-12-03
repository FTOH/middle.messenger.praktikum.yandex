import { Button } from 'components/Button'
import { Form } from 'components/Form/form'
import { TextField } from 'components/Textfield'
import { MainLayout } from 'layouts/MainLayout'
import { Block } from 'core/Block'
import { once } from 'utils/once'
import { Link } from 'components/Link'
import { AuthController } from 'controllers/AuthController'
import { RouterScheme } from 'core/Router'

export const RegisterPage = once(() => {
  const emailField = new TextField({
    label: 'Почта',
    name: 'email',
    autocomplete: 'email',
  })
  const loginField = new TextField({
    label: 'Логин',
    name: 'login',
    autocomplete: 'username',
  })
  const firstNameField = new TextField({
    label: 'Имя',
    name: 'first_name',
    validatorName: 'name',
    autocomplete: 'given-name',
  })
  const secondNameField = new TextField({
    label: 'Фамилия',
    name: 'second_name',
    validatorName: 'name',
    autocomplete: 'family-name',
  })
  const phoneField = new TextField({
    label: 'Номер телефона',
    name: 'phone',
    autocomplete: 'tel',
  })
  const passwordField = new TextField({
    label: 'Пароль',
    name: 'password',
    type: 'password',
    autocomplete: 'new-password',
  })
  const repeatPasswordField = new TextField({
    label: 'Пароль (ещё раз)',
    name: 'password',
    type: 'password',
    autocomplete: 'new-password',
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

  const link = new Link({
    text: 'Есть аккаунт? Войти',
    href: RouterScheme.LOGIN,
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
      link,
    ],
    onSubmit() {
      AuthController.register(form.getElements())
        .catch((error: string) => form.showError(error))
    },
  })

  return new MainLayout({ content: form as Block })
})
