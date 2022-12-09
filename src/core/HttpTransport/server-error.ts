import { isAnyObject } from 'utils/isAnyObject'

function getMessageFromResponse<T>(status: number, response: T | { reason?: string }) {
  if (isAnyObject(response) && response.reason) {
    return response.reason
  }
  return `Server response (${status}): ${JSON.stringify(response)}`
}

export class ServerError<T = Record<string, unknown>> extends Error {
  public name = 'ServerError'

  constructor(
    public readonly status: number,
    public readonly response: T | { reason?: string },
  ) {
    super(getMessageFromResponse(status, response))
  }
}
