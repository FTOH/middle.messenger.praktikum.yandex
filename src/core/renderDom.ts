import { Block } from './Block'

export async function renderDom<T extends Block['props']>(
  rootSelector: string,
  component: Block<T>,
) {
  const root = document.querySelector(rootSelector)
  if (!root) return

  root.innerHTML = ''
  root.append(component.getContent())

  component.dispatchComponentDidMount()
}
