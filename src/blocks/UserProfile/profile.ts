import { Dropdown } from 'components/Dropdown'
import { Link } from 'components/Link'
import { AuthController } from 'controllers/AuthController'
import { Block } from 'core/Block'
import { Router, RouterScheme } from 'core/Router'
import defaultImage from '../../assets/defaultprofile.svg'
import template from './profile.hbs'
import './profile.less'

type Props = {
  image?: string,
  fullname: string,
  username: string,
  displayname: string,
  mail: string,
  phone: string,
  onChooseAvatar: EventListener,
}

export class UserProfile extends Block<Props> {
  #dropdown: Dropdown

  constructor({
    image = '',
    fullname = '',
    username = '',
    displayname = '',
    mail = '',
    phone = '',
    onChooseAvatar = (() => {}) as EventListener,
  } = {}) {
    super({
      tag: 'section',
    }, {
      image: image.trim() || defaultImage,
      fullname,
      username,
      displayname,
      mail,
      phone,
      onChooseAvatar,
    })

    this.#dropdown = new Dropdown({
      text: 'Изменить',
      items: [{
        text: 'Фотографию',
        onClick: (event) => {
          this.props.onChooseAvatar(event)
        },
      }, {
        text: 'Информацию',
        onClick() {
          Router().go(RouterScheme.SETTINGS)
        },
      }, {
        text: 'Пароль',
        onClick() {
          Router().go(RouterScheme.CHANGE_PASSWORD)
        },
      }],
    })
  }

  #exitLink = new Link({
    text: 'Выйти из аккаунта',
    dangerous: true,
    onClick() {
      AuthController.logout()
    },
  })

  #failedDownloadAvatar = () => {
    if (!this.props.image?.includes(defaultImage)) {
      this.setProps({ image: defaultImage })
    }
  }

  protected render() {
    return this.compile(template, {
      dropdown: this.#dropdown,
      exitLink: this.#exitLink,
      failedDownloadAvatar: this.#failedDownloadAvatar,
    })
  }
}
