import { InlineError } from 'components/InlineError'
import { TextField } from 'components/Textfield'
import { Block } from 'core/Block'
import template from './form.hbs'
import './form.less'

const NoOp = () => {}

type Props = {
  rows: unknown[],
  header: string,
  error: InlineError
}

export class Form extends Block<Props> {
  constructor({
    header = 'Загаловок',
    rows = [] as Props['rows'],
    error = new InlineError({ className: 'form__error' }),
    onSubmit = NoOp as ((event: SubmitEvent) => unknown),
  }) {
    super({
      tag: 'form',
      parentEvents: {
        input: () => {
          this.hideError()
        },
        submit: (event: Event) => {
          event.preventDefault()
          this.hideError()

          if (this.isValid()) {
            onSubmit(event as SubmitEvent)
          } else {
            this.showError('Заполните необходимые поля или исправьте ошибки')
          }
        },
      },
    }, { rows, header, error })
  }

  #getTextFields() {
    return this.props.rows.filter((row) => row instanceof TextField) as TextField[]
  }

  public showError(error: string) {
    this.props.error.setProps({ message: error })
  }

  public hideError() {
    this.props.error.setProps({ message: '' })
  }

  public getFormData() {
    return new FormData(this.getContent() as HTMLFormElement)
  }

  public getElements() {
    return Object.fromEntries(this.getFormData())
  }

  public isValid() {
    const inputs = this.#getTextFields()
    return inputs.every((input) => input.isValid())
  }

  protected render() {
    return this.compile(template)
  }
}
