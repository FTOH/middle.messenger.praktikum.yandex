export function isAnyObject(value: unknown): value is object {
  return value != null && typeof value === 'object'
}
