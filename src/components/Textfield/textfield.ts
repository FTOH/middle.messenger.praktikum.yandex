import { Block } from 'core/Block'
import { validateByType, ValidationType, Validator } from 'core/validation'
import { InlineError } from '../InlineError'
import template from './textfield.hbs'
import './textfield.less'

type Props = {
  type: InputTypeAttr,
  name: string | ValidationType,
  value: string,
  label: string,
  autocomplete: InputAutocompleteAttr,
  isValid: boolean,
  validatorName: ValidationType,
  customValidator?: Validator,
  error: InlineError,
  input: EventListener,
  focus: EventListener,
  blur: EventListener,
  required: boolean,
}

type ForceValidation =
  | { name: ValidationType }
  | { validatorName: ValidationType }
  | { customValidator: Validator }

type PropsWithValidation = Partial<Props> & ForceValidation

export class TextField extends Block<Props> {
  #isFocused = false

  constructor({
    type = 'text',
    name = '',
    value = '',
    label = '',
    autocomplete = 'off',
    validatorName = undefined,
    required = true,
    customValidator = undefined,
  }: PropsWithValidation) {
    super({
      tag: 'section',
      className: 'textfield',
    }, {
      type,
      name,
      value,
      label,
      autocomplete,
      isValid: false,
      required,

      error: new InlineError({ className: 'textfield__error' }),

      validatorName: (validatorName ?? name) as ValidationType,
      customValidator,

      input: ({ target }: Event) => {
        const { value: textValue } = target as HTMLInputElement
        this.setProps({ value: textValue })
      },
      focus: () => {
        this.#validate()
        this.#isFocused = true
      },
      blur: () => {
        this.#isFocused = false
      },
    })

    setTimeout(() => this.#validate())
  }

  #validate() {
    const { value, required } = this.props
    let error
    let isValid = false
    if (required) {
      // покажет ошибку или звездочку
      if (value) {
        error = this.#useValidator(value)
        isValid = !error
        error ??= '*'
      } else {
        error = '*'
      }
    } else if (value) {
      // ошибку или ничего
      error = this.#useValidator(value)
      isValid = !error
    } else {
      isValid = true
    }
    this.setProps({ isValid })
    this.props.error.setProps({ message: error })
    return isValid
  }

  protected componentDidUpdate(_oldProps: Props, _newProps: Props, changedProps: (keyof Props)[]) {
    if (changedProps.includes('isValid')) {
      return false
    }
    if (changedProps.includes('value')) {
      this.#validate()
    }
    if (this.#isFocused) {
      return false
    }
    return true
  }

  public isValid() {
    return this.#validate()
  }

  #useValidator(value: string): string | undefined {
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
