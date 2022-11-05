import { Block } from 'core/Block'

type Props = {
  message: string
}

export class InlineError extends Block<Props> {
  constructor({
    message = '',
    className = '',
  } = {}) {
    super({
      tag: 'span',
      className,
    }, { message })
  }

  protected render() {
    return this.props.message
  }
}
