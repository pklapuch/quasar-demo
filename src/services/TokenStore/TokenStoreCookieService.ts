import { LoginResponse } from 'src/models/LoginResponse';
import { setCookie, getCookie } from 'src/services/CookieUtil';

export function storeTokenService(response: LoginResponse) {
  setCookie('access_token', response.accessToken);
  setCookie('refresh_token', response.refreshToken);
}

export function loadTokenService(): LoginResponse {
  const accessToken = getCookie('access_token');
  const refreshToken = getCookie('refresh_token');

  if (accessToken && refreshToken) {
    return new LoginResponse(accessToken, refreshToken);
  } else {
    throw Error('No token found');
  }
}
