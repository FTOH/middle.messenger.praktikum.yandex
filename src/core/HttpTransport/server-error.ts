import { isAnyObject } from 'utils/isAnyObject'

export class ServerError<T> extends Error {
  public name = 'ServerError'

  constructor(
    public readonly status: number,
    response: T | { reason?: string },
  ) {
    if (isAnyObject(response) && response.reason) {
      super(response.reason)
    } else {
      super(`Server response (${status}): ${JSON.stringify(response)}`)
    }
  }
}
