import { is3rdPartyCookieAllowed } from 'utils/is3rdPartyCookieAllowed'

(function loop() {
  is3rdPartyCookieAllowed()
    .then((isAllowed) => {
      if (isAllowed) {
        window.location.href = '/'
      }
    })
    .catch(console.error)
    .finally(() => {
      setTimeout(loop, 1_000)
    })
}())
