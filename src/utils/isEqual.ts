export function isEqual(a: Record<string, unknown>, b: Record<string, unknown>): boolean {
  const keys = Object.keys(a)
  if (keys.length !== Object.keys(b).length) {
    return false
  }

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  const isSame = keys.every((prop) => {
    if (!(prop in b)) {
      return false
    }
    if (a[prop] === b[prop]) {
      return true
    }
    if ([typeof a[prop], typeof b[prop]].some((e) => e !== 'object')) {
      return false
    }
    if (!a[prop] || !b[prop]) {
      return false
    }
    if (!isEqual(a[prop] as Record<string, unknown>, b[prop] as Record<string, unknown>)) {
      return false
    }
    return true
  })
  return isSame
}
