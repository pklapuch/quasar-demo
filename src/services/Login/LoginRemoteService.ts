import { LoginRequest } from 'src/DIContainer/LoginContainer';
import { mapRequest } from './LoginRequestMapper';
import { noAuthHttpClient } from 'src/DIContainer/CoreContainer';
import { mapResponse } from './LoginResponseMapper';
import { setCookie } from '../CookieUtil';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loginRemoteService(request: LoginRequest) {
  try {
    const apiRequest = mapRequest(request);
    const apiResponse = await noAuthHttpClient(apiRequest);
    const response = mapResponse(apiResponse);

    setCookie('access_token', response.accessToken);
    setCookie('refresh_token', response.refreshToken);
  } catch (error) {
    throw error;
  }
}
