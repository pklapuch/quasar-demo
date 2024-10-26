import { LoginResponse } from 'src/Domain/Login/LoginResponse';
import { TokenLocalRepository } from './TokenLocalRepository';
import { setCookie, getCookie } from 'src/services/CookieUtil';

/// Represents production-grade repository (cookies - invoking this repository will trigger calls to local storage)
export class CookieTokenLocalRepository implements TokenLocalRepository {
  store(response: LoginResponse): void {
    setCookie('access_token', response.accessToken);
    setCookie('refresh_token', response.refreshToken);
  }

  load(): LoginResponse {
    const accessToken = getCookie('access_token');
    const refreshToken = getCookie('refresh_token');

    if (accessToken && refreshToken) {
      return new LoginResponse(accessToken, refreshToken);
    } else {
      throw Error('No token found');
    }
  }
}
