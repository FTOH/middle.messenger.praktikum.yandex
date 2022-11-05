export function queryStringify(data: Record<string, unknown>) {
  return `?${Object.entries(data).map((entry) => entry.join('=')).join('&')}`
}
