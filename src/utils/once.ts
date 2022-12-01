// eslint-disable-next-line @typescript-eslint/ban-types
export const once = <T extends Function>(func: T): T => {
  let called = false
  let result: unknown
  const wrapper = function onceWrapper(...args: unknown[]): unknown {
    if (!called) {
      result = func(...args)
      called = true
    }
    return result
  }
  wrapper.originalName = func.name
  return wrapper as unknown as T
}
