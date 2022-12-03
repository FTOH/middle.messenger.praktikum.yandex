import { Router, RouterScheme } from 'core/Router'
import { ProfileApi } from 'api/ProfileApi'
import { store } from 'core/Store'
import { ChangePasswordData, ProfileData } from 'api/types'

function handleError(error: Error): void | never {
  if (error.message === 'User already in system') {
    Router().go(RouterScheme.MESSENGER)
    return
  }
  throw error
}

export const ProfileController = new class ProfileControllerSingleton {
  #api = new ProfileApi()

  public editProfile(user: Record<string, unknown>) {
    return this.#api.changeProfile(user as ProfileData).then((newUser) => {
      store.set('user', newUser)
      Router().go(RouterScheme.PROFILE)
    }).catch(handleError)
  }

  public editAvatar(file: File) {
    return this.#api.changeAvatar(file).then((user) => {
      store.set('user', user)
    }).catch(handleError)
  }

  public editPassword(password: Record<string, unknown>) {
    return this.#api.changePassword(password as ChangePasswordData).then(() => {
      Router().go(RouterScheme.PROFILE)
    }).catch(handleError)
  }
}()
