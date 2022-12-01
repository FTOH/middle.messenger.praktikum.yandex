import { HTTPTransport } from 'core/HttpTransport'
import { LoginData, RegisterData, UserData } from './types'

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth/')

export class AuthApi {
  public login(user: LoginData) {
    return http.post('signin', {
      data: user,
    })
  }

  public logout() {
    return http.post('logout')
  }

  public register(user: RegisterData) {
    return http.post('signup', {
      data: user,
    })
  }

  public getUser() {
    return http.get<UserData>('user')
  }
}
