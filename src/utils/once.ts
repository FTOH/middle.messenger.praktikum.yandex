interface OnceInner extends Function {
  originalName?: string
}

export const once = <T extends OnceInner>(func: T): T => {
  let called = false
  let result: unknown
  const wrapper: OnceInner = function onceWrapper(...args: unknown[]) {
    if (!called) {
      result = func(...args)
      called = true
    }
    return result
  }
  wrapper.originalName = func.name
  return wrapper as T
}
