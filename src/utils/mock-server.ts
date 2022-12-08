import express, { Express } from 'express'
import { request } from 'http'
import type { IncomingHttpHeaders } from 'http'

const CHECK_AVIABILITY_URL = '/33452716-e17e-4f15-bb17-5f07fe59d14a'

const rand = (min: number, max = 0) => Math.floor(Math.random() * (max - min) + min)

type HTTPMethods = 'GET' | 'PUT' | 'POST' | 'DELETE'

// https://github.com/sindresorhus/type-fest/blob/main/source/omit-index-signature.d.ts
type OmitIndexSignature<ObjectType> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [KeyType in keyof ObjectType as {} extends Record<KeyType, unknown>
    ? never
    : KeyType]: ObjectType[KeyType];
}

export class MockServer {
  private app?: Express

  private setupStatus = 'none' as 'none' | 'started' | 'setuped'

  private isTimoutedSetup = false

  public setup(): Promise<number> {
    if (this.setupStatus !== 'none') {
      throw new Error('MockServer: setup called 2 more times')
    }
    this.setupStatus = 'started'

    this.app = express()
    const { app } = this

    app.get('/timeout/:ms', (req, res) => {
      setTimeout(() => res.end(), Number(req.params.ms) || 5000)
    })

    app.get(CHECK_AVIABILITY_URL, (_req, res) => {
      res.send('ok')
    })

    app.use((req, res) => {
      this.request = {
        method: req.method as HTTPMethods,
        url: req.url,
        headers: req.headers,
      }
      res.status(this.respnonse.status)
        .send(this.respnonse.body)
    })

    return new Promise<number>((resolve, reject) => {
      this.trySetup(app, resolve, reject)

      setTimeout(() => {
        this.isTimoutedSetup = true
      }, 5000)
    }).then((port) => {
      this.setupStatus = 'setuped'
      return this.waitFirstRequest(port)
    })
  }

  private trySetup(
    app: Express,
    resolve: CallableFunction,
    reject: CallableFunction,
  ) {
    if (this.isClosed) {
      reject(new Error('MockServer: server closed while setup'))
      return
    }
    if (this.isTimoutedSetup) {
      reject(new Error('MockServer: exceeded timeout'))
      return
    }
    const port = rand(3000, 65000)
    const server = app.listen(port, () => {
      if (this.isClosed) {
        server.close()
        reject(new Error(`MockServer: server closed while setup with port ${port}`))
      } else {
        this.closeHandler = () => {
          server.close()
        }
        resolve(port)
      }
    })
    server.timeout = 2000
    server.once('error', (error: { code: string }) => {
      server.close()
      if (error.code === 'EADDRINUSE') {
        setTimeout(() => this.trySetup(app, resolve, reject))
      } else {
        reject(error)
      }
    })
  }

  private waitFirstRequest(port: number) {
    return new Promise<number>((resolve, reject) => {
      request(`http://localhost:${port}${CHECK_AVIABILITY_URL}`, () => {
        resolve(port)
      })
        .on('error', reject)
        .end('')
    })
  }

  private request = {
    method: 'GET' as HTTPMethods,
    url: '',
    headers: {} as IncomingHttpHeaders,
  }

  public getRequest(): Readonly<typeof this.request> {
    return this.request
  }

  public get method() {
    return this.request.method
  }

  public get url() {
    return this.request.url
  }

  public header(header: keyof OmitIndexSignature<IncomingHttpHeaders>) {
    return this.request.headers[header]
  }

  public resetRequest() {
    this.request = {
      method: 'not called' as 'GET',
      url: 'not called',
      headers: {
        _: 'not called',
      },
    }
  }

  private respnonse = {
    status: 100,
    body: {} as string | Record<string, unknown>,
  }

  public setResponse(status: number, body: typeof this.respnonse['body']) {
    if (this.setupStatus !== 'setuped') {
      throw new Error('MockServer: trying use non setuped server')
    }
    this.respnonse = { status, body }
  }

  private isClosed = false

  private closeHandler = () => { }

  public close() {
    if (this.setupStatus === 'none') {
      throw new Error('MockServer: trying to close not setuped server')
    }
    if (!this.isClosed) {
      this.isClosed = true
      this.closeHandler()
      this.app = undefined
    }
  }
}
