import { LoginRequest } from 'src/models/LoginRequest';
import { mapRequest } from './LoginRequestMapper';
import { noAuthHttpClient } from 'src/DIContainer/NoAuthHttpClientContainer';
import { mapResponse } from './LoginResponseMapper';

export function loginRemoteRepository() {
  async function login(request: LoginRequest) {
    const apiRequest = mapRequest(request);
    const apiResponse = await noAuthHttpClient(apiRequest);
    return mapResponse(apiResponse);
  }

  return {
    login,
  };
}
