/* eslint-disable @typescript-eslint/no-explicit-any */
import { assert } from 'chai'
import { Router } from './router'

const routes: string[] = []
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
globalThis.window = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  history: {
    pushState(_data: unknown, _nused: unknown, url: string) {
      routes.push(url)
    },
  },
} as any

describe('Test Router', () => {
  it('router navigation', () => {
    Router().go('/messages')

    assert.deepEqual(routes, ['/messages'])
  })
})
