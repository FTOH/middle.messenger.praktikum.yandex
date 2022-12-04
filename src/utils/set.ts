type Indexed<T = unknown> = {
  [key in string]: T;
}

interface NonEmptyArray<T> extends Array<T> {
  0: T;
  pop(): T;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (!object || typeof object !== 'object') {
    return object
  }
  if (typeof path !== 'string') {
    throw new Error('path must be string')
  }
  const sectors = path.split('.') as NonEmptyArray<string>
  const prop = sectors.pop()
  const final = sectors.reduce<Indexed>((res: Indexed, sector: string): Indexed => {
    res[sector] = (res[sector] || {})
    return res[sector] as Indexed
  }, object as Indexed)
  final[prop] = value
  return object
}
