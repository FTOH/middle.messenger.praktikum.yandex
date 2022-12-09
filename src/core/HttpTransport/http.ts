import { queryStringify } from 'utils/queryStringify'
import { ServerError } from './server-error'

const enum Method {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type SerializableData = FormData | Blob | ArrayBuffer | DataView

type Options = {
  headers?: Record<string, string>,
  data?: Record<string, unknown>,
  method?: Method,
  timeout?: number,
}

type OptionsWithData = Omit<Options, 'data'> & {
  data?: SerializableData | Record<string, unknown>,
}

function setHeaders(xhr: XMLHttpRequest, headers: Record<string, string>) {
  Object.entries(headers).forEach(([key, value]) => {
    xhr.setRequestHeader(key, value)
  })
}

function isSerializable(data: unknown): data is SerializableData {
  return [FormData, Blob, ArrayBuffer, DataView].some((Type) => data instanceof Type)
}

function tryDecodeJson(text: string, fallback: unknown): unknown {
  try {
    return JSON.parse(text)
  } catch (_) {
    return fallback
  }
}

function handleResponse<T>(
  xhr: XMLHttpRequest,
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason?: unknown) => void,
) {
  const isJson = xhr.getResponseHeader('content-type')
    ?.startsWith('application/json')
  const res: unknown = isJson ? tryDecodeJson(xhr.responseText, xhr.response) : xhr.response

  const isOk = Math.floor(xhr.status / 100) === 2
  if (isOk) {
    resolve(res as T)
  } else {
    reject(new ServerError(xhr.status, res))
  }
}

export class HTTPTransport {
  constructor(readonly baseUrl: string = '') { }

  public get<T>(url: string, options: Options = {}) {
    if (options.data) {
      url = url.replace(/#.*$/, '')
      url += url.includes('?') ? '&' : '?'
      url += queryStringify(options.data)
    }
    return this.request<T>(url, {
      ...options,
      data: undefined,
      method: Method.GET,
    })
  }

  public put<T>(url: string, options: OptionsWithData = {}) {
    return this.request<T>(url, {
      ...options,
      method: Method.PUT,
    })
  }

  public post<T>(url: string, options: OptionsWithData = {}) {
    return this.request<T>(url, {
      ...options,
      method: Method.POST,
    })
  }

  public delete<T>(url: string, options: OptionsWithData = {}) {
    return this.request<T>(url, {
      ...options,
      method: Method.DELETE,
    })
  }

  private request<T>(url: string, options: OptionsWithData): Promise<T> {
    const {
      data,
      headers = {},
      method = Method.GET,
      timeout = 5000,
    } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, this.baseUrl + url, true)

      xhr.timeout = timeout
      xhr.withCredentials = true
      setHeaders(xhr, headers)

      xhr.onload = () => {
        handleResponse<T>(xhr, resolve, reject)
      }
      xhr.onerror = reject
      xhr.onabort = reject
      xhr.ontimeout = reject

      if (!data) {
        xhr.send()
      } else if (isSerializable(data)) {
        xhr.send(data)
      } else {
        xhr.setRequestHeader('content-type', 'application/json')
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
