import { Block } from 'core/Block'
import './error.less'

type Props = {
  message: string
}

export class InlineError extends Block<Props> {
  constructor({
    message = '',
    className = '',
  } = {}) {
    super({
      tag: 'div',
      className: `inline-error ${className}`,
    }, { message })
  }

  #copyWrapperHeight(wrapper: HTMLElement) {
    requestAnimationFrame(() => {
      this.getContent().style.height = `${wrapper.offsetHeight}px`
    })
  }

  protected render() {
    const wrapper = document.createElement('span')
    wrapper.textContent = this.props.message

    this.#copyWrapperHeight(wrapper)
    return wrapper
  }
}
