import { assert } from 'chai'
import { JSDOM } from 'jsdom'
import { Router } from './router'
import { RouterScheme } from './scheme'

const waitForEvent = (event: string) => new Promise((resolve) => {
  window.addEventListener(event, resolve, { once: true })
})

describe('core/Router', function () {
  before(function () {
    const { window } = new JSDOM('', {
      url: 'http://localhost:3000/',
    })
    globalThis.window = window as any
    globalThis.location = window.location
    globalThis.history = window.history
  })

  it('simple navigation', function () {
    Router().start()

    assert.equal(location.pathname, '/')

    Router().go('/messenger' as RouterScheme)

    assert.equal(location.pathname, '/messenger')

    Router().go('/profile' as RouterScheme)

    assert.equal(location.pathname, '/profile')
    assert.equal(history.length, 3)
  })

  it('back/forward navigation', async function () {
    assert.equal(history.length, 3)

    Router().go('/' as RouterScheme)
    Router().go('/messenger' as RouterScheme)
    Router().go('/profile' as RouterScheme)

    assert.equal(history.length, 6)
    assert.equal(location.pathname, '/profile')

    Router().back()
    await waitForEvent('popstate')
    Router().back()
    await waitForEvent('popstate')

    assert.equal(location.pathname, '/')

    Router().forward()
    await waitForEvent('popstate')

    assert.equal(location.pathname, '/messenger')
  })
})
