import { assert } from 'chai'
import { JSDOM } from 'jsdom'
import { renderDom } from 'utils/renderDom'
import { Button } from './button'

const delay = Promise.resolve()

describe('components/Button', function () {
  before(function () {
    const { window } = new JSDOM('<div class="app"></div>', {
      url: 'http://localhost:3000/',
    })
    globalThis.window = window as any
    globalThis.document = window.document
  })

  let button: Button
  let clickCount = 0

  before(async function () {
    button = new Button({
      content: 'Hello World!',
      className: 'red-button',
      onClick() {
        clickCount += 1
      },
    })
    await delay // async render
  })

  it('renders', function () {
    assert.equal(button.blockName, 'Button')

    renderDom('.app', button)

    const element = document.querySelector('button')!

    assert.equal(button.getContent(), element)
    assert.equal(
      element.outerHTML,
      '<button class="button red-button">Hello World!</button>',
    )
  })

  it('handle events', function () {
    const element = document.querySelector('button')!

    assert.equal(clickCount, 0)
    element.click()
    assert.equal(clickCount, 1)
    element.click()
    element.click()
    assert.equal(clickCount, 3)
  })

  it('rerenders', function () {
    const element = document.querySelector('button')!

    button.setProps({ content: 'present is present' })

    assert.equal(
      element.outerHTML,
      '<button class="button red-button">present is present</button>',
    )
  })
})
