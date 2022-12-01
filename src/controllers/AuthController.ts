import { AuthApi } from 'api/AuthApi'
import { LoginData, RegisterData } from 'api/types'
import { Router } from 'core/Router'
import { store } from 'core/Store'

function handleError(error: { reason?: string, message?: string }): void | never {
  if (error.reason === 'User already in system') {
    Router().go('/messages')
    return
  }
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw error.reason ?? error.message
}

export const AuthController = new class AuthController {
  #api = new AuthApi()

  constructor() {
    this.getUserSilent()
  }

  public login(user: Record<string, unknown>) {
    return this.#api.login(user as LoginData).then(() => {
      Router().go('/messages')
    }).catch(handleError)
  }

  public logout() {
    this.#api.logout()
      .then(() => {
        store.clear()
        Router().go('/')
      }).catch(console.error)
  }

  public register(user: Record<string, unknown>) {
    return this.#api.register(user as RegisterData).then(() => {
      Router().go('/messages')
    }).catch(handleError)
  }

  public getUserSilent() {
    this.getUser()
      .catch(() => {
        Router().go('/')
      })
  }

  public getUser() {
    return this.#api.getUser()
      .then((user) => store.set('user', user))
  }
}()
