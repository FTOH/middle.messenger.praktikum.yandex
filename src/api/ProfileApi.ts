import { HTTPTransport } from 'core/HttpTransport'
import { ChangePasswordData, ProfileData, UserData } from './types'

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2/user/')

export class ProfileApi {
  public changeProfile(user: ProfileData) {
    return http.put<UserData>('profile', {
      data: user,
    })
  }

  public changeAvatar(file: File) {
    const formData = new FormData()
    formData.append('avatar', file)

    return http.put<UserData>('profile/avatar', {
      data: formData,
    })
  }

  public changePassword(password: ChangePasswordData) {
    return http.put('password', {
      data: password,
    })
  }
}
