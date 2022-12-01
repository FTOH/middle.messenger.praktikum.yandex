type StringIndexed = Record<string, unknown>

function getEntries(data: StringIndexed, prefix = ''): [string, unknown][] {
  const prefixy: (key: string) => string = prefix ? (v) => `${prefix}[${v}]` : (v) => v
  const entries: [string, unknown][] = []
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value !== 'object' || value == null) {
      entries.push([prefixy(key), value])
      return
    }
    entries.push(...getEntries(value as StringIndexed, prefixy(key)))
  })
  return entries
}

export function queryStringify(data: StringIndexed): string | never {
  if (typeof data !== 'object') {
    throw new Error('input must be an object')
  }
  const entries = getEntries(data)
  return entries.map((entry) => entry.join('=')).join('&')
}
