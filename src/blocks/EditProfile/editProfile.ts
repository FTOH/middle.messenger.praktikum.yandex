import { UserData } from 'api/types'
import { Button } from 'components/Button'
import { Form } from 'components/Form/form'
import { TextField } from 'components/Textfield'
import { ProfileController } from 'controllers/ProfileController'
import { Block } from 'core/Block'
import { RouterScheme } from 'core/Router'
import { MainLayout } from 'layouts/MainLayout'

type Props = Pick<UserData, 'email' | 'login' | 'first_name' | 'second_name' | 'phone' | 'display_name'>

export class EditProfile extends Block<Props> {
  #fieds: {
    emailField: TextField
    loginField: TextField
    displayNameField: TextField
    firstNameField: TextField
    secondNameField: TextField
    phoneField: TextField
  }

  #layout: MainLayout

  constructor({
    email = '',
    login = '',
    first_name = '',
    second_name = '',
    phone = '',
    display_name = '',
  }: Partial<Props> = {}) {
    super({
      tag: 'section',
    }, {
      email,
      login,
      first_name,
      second_name,
      phone,
      display_name,
    })

    const emailField = new TextField({
      label: 'Почта',
      name: 'email',
      value: email,
    })
    const loginField = new TextField({
      label: 'Логин',
      name: 'login',
      value: login,
    })
    const displayNameField = new TextField({
      label: 'Имя в чате',
      name: 'display_name',
      validatorName: 'none',
      required: false,
      value: display_name ?? '',
    })
    const firstNameField = new TextField({
      label: 'Имя',
      name: 'first_name',
      validatorName: 'name',
      value: first_name,
    })
    const secondNameField = new TextField({
      label: 'Фамилия',
      name: 'second_name',
      validatorName: 'name',
      value: second_name,
    })
    const phoneField = new TextField({
      label: 'Номер телефона',
      name: 'phone',
      value: phone,
    })
    const submitButton = new Button({
      content: 'Сохранить',
      className: 'container__element--gap',
    })

    const form = new Form({
      header: 'Настройки',
      rows: [
        firstNameField,
        secondNameField,
        displayNameField,
        loginField,
        emailField,
        phoneField,
        submitButton,
      ],
      onSubmit() {
        ProfileController.editProfile(form.getElements())
          .catch((error: string) => form.showError(error))
      },
    })

    this.#fieds = {
      emailField,
      loginField,
      displayNameField,
      firstNameField,
      secondNameField,
      phoneField,
    }

    this.#layout = new MainLayout({
      content: form as Block,
      backLink: RouterScheme.PROFILE,
    })
  }

  protected componentDidUpdate(
    _oldProps: Props,
    _newProps: Props,
    _changedProps: string[],
  ): boolean {
    this.#fieds.emailField.setProps({ value: this.props.email })
    this.#fieds.displayNameField.setProps({ value: this.props.display_name ?? '' })
    this.#fieds.firstNameField.setProps({ value: this.props.first_name })
    this.#fieds.secondNameField.setProps({ value: this.props.second_name })
    this.#fieds.loginField.setProps({ value: this.props.login })
    this.#fieds.phoneField.setProps({ value: this.props.phone })
    return true
  }

  protected render() {
    return this.#layout.getContent()
  }
}
