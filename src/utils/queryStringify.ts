import { isAnyObject } from './isAnyObject'

type StringIndexed = Record<string, unknown> | unknown[]

function getEntries(data: StringIndexed, prefix = ''): [string, unknown][] {
  const prefixy: (key: string) => string = prefix
    ? (v: string) => `${prefix}[${encodeURIComponent(v)}]`
    : (v) => encodeURIComponent(v)

  const entries: [string, unknown][] = []

  Object.entries(data).forEach(([key, value]) => {
    if (!isAnyObject(value)) {
      entries.push([prefixy(key), encodeURIComponent(String(value))])
      return
    }
    entries.push(...getEntries(value as StringIndexed, prefixy(key)))
  })
  return entries
}

export function queryStringify(data: StringIndexed): string | never {
  const entries = getEntries(data)
  return entries.map((entry) => entry.join('=')).join('&')
}
