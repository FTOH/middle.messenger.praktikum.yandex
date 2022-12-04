import { AuthApi } from 'api/AuthApi'
import { LoginData, RegisterData } from 'api/types'
import { Router, RouterScheme } from 'core/Router'
import { store } from 'core/Store'

function handleError(error: Error): void | never {
  if (error.message === 'User already in system') {
    Router().go(RouterScheme.MESSENGER)
    return
  }
  throw error
}

export const AuthController = new class AuthControllerSingleton {
  #api = new AuthApi()

  constructor() {
    this.getUser()
  }

  public login(user: Record<string, unknown>) {
    return this.#api.login(user as LoginData).then(() => {
      Router().go(RouterScheme.MESSENGER)
    }).catch(handleError)
  }

  public logout() {
    this.#api.logout()
      .then(() => {
        store.clear()
        Router().go(RouterScheme.LOGIN)
      }).catch(console.error)
  }

  public register(user: Record<string, unknown>) {
    return this.#api.register(user as RegisterData).then(() => {
      Router().go(RouterScheme.MESSENGER)
    }).catch(handleError)
  }

  public getUser() {
    this.getUserPromise()
      .catch(() => {
        Router().go(RouterScheme.LOGIN)
      })
  }

  public getUserPromise() {
    return this.#api.getUser()
      .then((user) => store.set('user', user))
  }
}()
