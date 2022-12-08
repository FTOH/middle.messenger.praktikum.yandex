import { Block } from 'core/Block'

export function renderDom<T extends Block['props']>(
  rootSelector: string,
  component: Block<T>,
) {
  const root = document.querySelector(rootSelector)
  if (!root) throw new Error(`Не найден элемент для монтирования ${rootSelector}`)

  root.innerHTML = ''
  root.append(component.getContent())

  component.dispatchComponentDidMount()
}
