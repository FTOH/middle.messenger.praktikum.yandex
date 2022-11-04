import { Block } from 'core/Block'
import { validateByType, Validator } from 'core/validation'
import { InlineError } from '../InlineError'
import template from './textfield.hbs'
import './textfield.less'

type Props = {
  type: InputType,
  name: string,
  value: string,
  label: string,
  validatorName: string,
  customValidator?: Validator,
  error: InlineError,
  focus: EventListener,
  blur: EventListener,
}

export class TextField extends Block<Props> {
  constructor({
    type = 'text' as InputType,
    name = '',
    value = '',
    label = '',
    validatorName = '',
    customValidator = undefined as Validator | undefined,
  }) {
    super({
      tag: 'section',
      className: 'textfield',
    }, {
      type,
      name,
      value,
      label,
      validatorName: validatorName || name,
      customValidator,

      error: new InlineError({ className: 'textfield__error' }),

      focus: ({ target }: Event) => {
        const { value } = target as HTMLInputElement
        const error = this.#useValidator(value)
        this.props.error.setProps({ message: error || '' })
      },

      blur: ({ target }: Event) => {
        const { value } = target as HTMLInputElement
        const error = this.#useValidator(value)
        this.setProps({ value })
        this.props.error.setProps({ message: error || '' })
      },
    })
  }

  #useValidator(value: string): string | void {
    const { validatorName, customValidator } = this.props
    if (customValidator) {
      return customValidator(value)
    }
    return validateByType(validatorName, value)
  }

  protected render() {
    return this.compile(template)
  }
}
