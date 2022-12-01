import { Router } from 'core/Router'
import { ProfileApi } from 'api/ProfileApi'
import { store } from 'core/Store'
import { ChangePasswordData, ProfileData } from 'api/types'

function handleError(error: { reason?: string, message?: string }): void | never {
  if (error.reason === 'User already in system') {
    Router().go('/messages')
    return
  }
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw error.reason ?? error.message
}

export const ProfileController = new class ProfileController {
  #api = new ProfileApi()

  public editProfile(user: Record<string, unknown>) {
    return this.#api.changeProfile(user as ProfileData).then((newUser) => {
      store.set('user', newUser)
      Router().go('/profile')
    }).catch(handleError)
  }

  public editAvatar(file: File) {
    return this.#api.changeAvatar(file).then((user) => {
      store.set('user', user)
    }).catch(handleError)
  }

  public editPassword(password: Record<string, unknown>) {
    return this.#api.changePassword(password as ChangePasswordData).then(() => {
      Router().go('/profile')
    }).catch(handleError)
  }
}()
