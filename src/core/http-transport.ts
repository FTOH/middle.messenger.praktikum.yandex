/* eslint-disable arrow-body-style */
const enum METHOD {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

function queryStringify(data: Record<string, unknown>) {
  return `?${Object.entries(data).map((entry) => entry.join('=')).join('&')}`
}

interface Options {
  headers?: Record<string, string>,
  data?: Record<string, unknown>,
  method?: METHOD,
  timeout?: number,
}

export class HTTPTransport {
  public get = (url: string, options: Options = {}) => {
    if (options.data) url += queryStringify(options.data)
    options.data = undefined
    return this.request(
      url,
      { ...options, method: METHOD.GET },

      options.timeout,
    )
  }

  public put = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.PUT },

      options.timeout,
    )
  }

  public post = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.POST },

      options.timeout,
    )
  }

  public delete = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.DELETE },

      options.timeout,
    )
  }

  private request = (url: string, options: Options, timeout = 5000) => {
    const { headers = {}, data = {}, method = METHOD.GET } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)
      xhr.timeout = timeout
      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value)
      })
      xhr.onload = () => resolve(xhr)
      xhr.onerror = reject
      xhr.onabort = reject
      xhr.ontimeout = reject

      if (!data) xhr.send()
      else xhr.send(JSON.stringify(data))
    })
  }
}
