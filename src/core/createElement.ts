export function createElement(
  tagName: string,
  props: Record<string, string | number | EventListener | undefined | null> = {},
  ...children: (string | Node)[]
) {
  const node = document.createElement(tagName)
  Object.entries(props).forEach(([key, value]) => {
    if (typeof value === 'function') {
      node.addEventListener(key, value)
      return
    }
    if (value) {
      node.setAttribute(key, String(value))
    }
  })
  node.append(...children)
  return node
}
