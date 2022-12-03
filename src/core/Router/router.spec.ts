/* eslint-disable @typescript-eslint/no-explicit-any */
import { assert } from 'chai'
import { Router } from './router'
import { RouterScheme } from './scheme'

const routes: string[] = []
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
globalThis.window = {
  history: {
    pushState(_data: unknown, _nused: unknown, url: string) {
      routes.push(url)
    },
  },
} as any

describe('Test Router', function () {
  it('router navigation', function () {
    Router().go(RouterScheme.MESSENGER)

    assert.deepEqual(routes, ['/messenger'])
  })
})
