/**
 * Source: https://gist.github.com/FTOH/ed373437896428ccbc689cb4c31b8867
 */
const URL = 'https://gistcdn.githack.com/FTOH/ed373437896428ccbc689cb4c31b8867/raw/cff8f734ca5a179451902f56e44c341faf406e5e/index.min.html'

const iframe = document.createElement('iframe')
iframe.hidden = true

export const is3rdPartyCookieAllowed = () => new Promise<boolean>((resolve, reject) => {
  const listener = (event: MessageEvent) => {
    if (!event.data || typeof event.data !== 'object') { return }
    const data = event.data as { type?: string; value: boolean }
    if (data.type !== 'is-3d-party-cookie-allowed') return

    window.removeEventListener('message', listener)
    iframe.src = 'about:blank'
    iframe.remove()
    resolve(!!data.value)
  }

  window.addEventListener('message', listener)
  document.head.append(iframe)
  iframe.src = URL

  setTimeout(() => {
    window.removeEventListener('message', listener)
    reject(new Error('Cant\'t get information about 3rd-party cookies'))
  }, 5_000)
})
