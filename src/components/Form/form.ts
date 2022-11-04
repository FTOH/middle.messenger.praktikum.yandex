import { TextField } from 'components/Textfield'
import { Block } from 'core/Block'
import { validateInput } from 'core/validation'
import template from './form.hbs'

type Props = {
  rows: unknown[],
  header: string,
}

export class Form extends Block<Props> {
  constructor({
    header = 'Загаловок',
    action = '',
    rows = [] as Props['rows'],
  }) {
    super({
      tag: 'form',
      attr: {
        action,
      },
      parentEvents: {
        submit: (event: Event) => {
          event.preventDefault()

          const fields = this.props.rows.filter((row) => row instanceof TextField) as TextField[]
          const data = fields.map((field) => ({
            type: field.props.name,
            value: field.props.value,
          }))
          const error = validateInput(data)

          if (error) {
            console.error('Форма не отправлена из-за ошибки валидации')
          } else {
            const formData = new FormData(event.target as HTMLFormElement)
            // eslint-disable-next-line no-console
            console.log('Форма отправлена', Object.fromEntries([...formData.entries()]))
          }
        },
      },
    }, { rows, header })
  }

  protected render() {
    return this.compile(template)
  }
}
