/* eslint-disable arrow-body-style */
import { queryStringify } from './queryStringify'

const enum Method {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

interface Options {
  headers?: Record<string, string>,
  data?: Record<string, unknown>,
  method?: Method,
  timeout?: number,
}

export class HTTPTransport {
  public get = (url: string, options: Options = {}) => {
    if (options.data) {
      url += queryStringify(options.data)
    }
    options.data = undefined
    return this.request(url, { ...options, method: Method.GET })
  }

  public put = (url: string, options: Options = {}) => {
    return this.request(url, { ...options, method: Method.PUT })
  }

  public post = (url: string, options: Options = {}) => {
    return this.request(url, { ...options, method: Method.POST })
  }

  public delete = (url: string, options: Options = {}) => {
    return this.request(url, { ...options, method: Method.DELETE })
  }

  private request = (url: string, options: Options) => {
    const {
      headers = {}, data = {}, method = Method.GET, timeout = 5000,
    } = options

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
