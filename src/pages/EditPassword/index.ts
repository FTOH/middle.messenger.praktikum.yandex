import { Button } from 'components/Button'
import { Form } from 'components/Form/form'
import { TextField } from 'components/Textfield'
import { MainLayout } from 'layouts/MainLayout'
import { Block } from 'core/Block'
import { once } from 'utils/once'
import { ProfileController } from 'controllers/ProfileController'

export const EditPasswordPage = once(() => {
  const oldPasswordField = new TextField({
    label: 'Старый пароль',
    name: 'oldPassword',
    type: 'password',
    validatorName: 'password',
    autocomplete: 'current-password',
  })
  const passwordField = new TextField({
    label: 'Новый пароль',
    name: 'newPassword',
    type: 'password',
    validatorName: 'password',
    autocomplete: 'new-password',
  })
  const repeatPasswordField = new TextField({
    label: 'Новый пароль (ещё раз)',
    name: 'newPassword',
    type: 'password',
    autocomplete: 'new-password',
    customValidator(value: string) {
      if (passwordField.props.value !== value) {
        return 'Пароли не совпадают'
      }
    },
  })
  const submitButton = new Button({
    content: 'Сохранить',
    className: 'container__element--gap',
  })

  const form = new Form({
    header: 'Изменить пароль',
    rows: [
      oldPasswordField,
      passwordField,
      repeatPasswordField,
      submitButton,
    ],
    onSubmit() {
      ProfileController.editPassword(form.getElements())
        .catch((error: string) => form.showError(error))
    },
  })

  return new MainLayout({
    content: form as Block,
    backLink: '/profile',
  })
})
