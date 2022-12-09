import { assert } from 'chai'
import { MockServer } from 'utils/mock-server'
import { JSDOM } from 'jsdom'
import { HTTPTransport } from './http'
import { ServerError } from './server-error'

const stubPayload = {
  key1: 0,
  key2: 'string',
  key3: [1, 2, 3],
  key4: { a: { b: 1 } },
}

const stubResponse = {
  key1: 0,
  key2: 'string',
  key3: [1, 2, 3],
  key4: { a: { b: 1 } },
}

describe('core/HttpTransport', function () {
  let mock: MockServer
  let http: HTTPTransport

  before(async function () {
    mock = new MockServer()
    const port = await mock.setup()

    http = new HTTPTransport(`http://localhost:${port}`)

    const { window } = new JSDOM('', {
      url: `http://localhost:${port}/`,
    })
    globalThis.XMLHttpRequest = window.XMLHttpRequest
    globalThis.FormData = window.FormData
    globalThis.Blob = window.Blob
    globalThis.ProgressEvent = window.ProgressEvent
  })

  beforeEach(() => {
    mock.resetRequest()
  })

  it('timeout 1 sec', async function () {
    try {
      await http.get('/timeout/1000', {
        data: stubPayload,
        timeout: 1000,
      })
      assert.fail('not thrown error')
    } catch (error: any) {
      assert(error instanceof ProgressEvent, 'timeout error is not ProgressEvent class')
      assert.equal(error.type, 'timeout')
    }
  })

  describe('GET', function () {
    it('GET 200', async function () {
      mock.setResponse(200, stubResponse)

      const res = await http.get('/', {
        data: stubPayload,
      })

      assert.equal(mock.method, 'GET')
      assert.equal(mock.url, '/?key1=0&key2=string&key3[0]=1&key3[1]=2&key3[2]=3&key4[a][b]=1')
      assert.deepEqual(res, stubResponse)
    })

    it('GET 404', async function () {
      mock.setResponse(404, stubResponse)

      try {
        await http.get('/', {
          data: stubPayload,
        })
        assert.fail('not thrown error')
      } catch (error) {
        assert.equal(mock.method, 'GET')
        assert.equal(mock.url, '/?key1=0&key2=string&key3[0]=1&key3[1]=2&key3[2]=3&key4[a][b]=1')

        assert(error instanceof ServerError)
        assert.equal(error.status, 404)
        assert.deepEqual(error.response, stubResponse)
      }
    })
  })

  describe('POST', function () {
    it('POST 200', async function () {
      mock.setResponse(200, stubResponse)

      const res = await http.post('/', {
        data: stubPayload,
      })

      assert.equal(mock.method, 'POST')
      assert.equal(mock.url, '/')
      assert.deepEqual(res, stubResponse)
    })

    it('POST 404', async function () {
      mock.setResponse(404, stubResponse)

      try {
        await http.post('/', {
          data: stubPayload,
        })
        assert.fail('not thrown error')
      } catch (error) {
        assert.equal(mock.method, 'POST')
        assert.equal(mock.url, '/')
        assert.equal(mock.header('content-type'), 'application/json')

        assert(error instanceof ServerError)
        assert.equal(error.status, 404)
        assert.deepEqual(error.response, stubResponse)
      }
    })
  })

  describe('PUT', function () {
    it('PUT 200', async function () {
      mock.setResponse(200, stubResponse)

      const res = await http.put('/', {
        data: stubPayload,
      })

      assert.equal(mock.method, 'PUT')
      assert.equal(mock.url, '/')
      assert.deepEqual(res, stubResponse)
    })

    it('PUT 404', async function () {
      mock.setResponse(404, stubResponse)

      try {
        await http.put('/', {
          data: stubPayload,
        })
        assert.fail('not thrown error')
      } catch (error) {
        assert.equal(mock.method, 'PUT')
        assert.equal(mock.url, '/')
        assert.equal(mock.header('content-type'), 'application/json')

        assert(error instanceof ServerError)
        assert.equal(error.status, 404)
        assert.deepEqual(error.response, stubResponse)
      }
    })
  })

  describe('DELETE', function () {
    it('DELETE 200', async function () {
      mock.setResponse(200, stubResponse)

      const res = await http.delete('/', {
        data: stubPayload,
      })

      assert.equal(mock.method, 'DELETE')
      assert.equal(mock.url, '/')
      assert.deepEqual(res, stubResponse)
    })

    it('DELETE 404', async function () {
      mock.setResponse(404, stubResponse)

      try {
        await http.delete('/', {
          data: stubPayload,
        })
        assert.fail('not thrown error')
      } catch (error) {
        assert.equal(mock.method, 'DELETE')
        assert.equal(mock.url, '/')
        assert.equal(mock.header('content-type'), 'application/json')

        assert(error instanceof ServerError)
        assert.equal(error.status, 404)
        assert.deepEqual(error.response, stubResponse)
      }
    })
  })

  after(function () {
    mock.close()
  })
})
