import { Block } from 'core/Block'
import template from './error.hbs'
import './error.less'

type Props = {
  header: string,
  errorCode: number,
  backText: string,
}

export class ErrorLayout extends Block<Props> {
  constructor({
    header = '',
    errorCode = 0,
    backText = 'Вернуться главную',
  }) {
    super({
      tag: 'main',
      className: 'error-page',
    }, { header, errorCode, backText })
  }

  protected override render() {
    return this.compile(template)
  }
}
