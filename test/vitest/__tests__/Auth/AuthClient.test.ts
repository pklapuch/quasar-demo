import { APIRequest, APIResponse } from 'src/api/APIModels';
import { LoginResponse } from 'src/models/LoginResponse';
import { expect, it } from 'vitest';
import authClient from 'src/services/HTTPClient/AuthExecutor';

it('on non 401 server response, delivers server response without triggering token refresh', async () => {
  const request = new APIRequest('https://any.com', 'GET', null, null);
  const storedToken = new LoginResponse('access_token', 'refresh_token');
  const dataResponse = new APIResponse(203, null, null);

  function loadToken() {
    return storedToken;
  }

  function saveToken(token: LoginResponse) {
    throw Error('Unexpected state ' + token);
  }

  function refreshToken(accessToken: string): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      throw Error('Unexpected state' + accessToken);
    });
  }

  function executeRequest(request: APIRequest): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      resolve(dataResponse);
    });
  }

  const sut = authClient(loadToken, saveToken, refreshToken, executeRequest);

  const receivedResponse = (await sut.executeWithAuth(request)) as APIResponse;

  expect(receivedResponse.statusCode).toBe(dataResponse.statusCode);
});

it('on 401 server response, refreshes token and delivers retry response', async () => {
  const request = new APIRequest('https://any.com', 'GET', null, null);
  const storedExpiredToken = new LoginResponse('access_token', 'refresh_token');
  const serverNewToken = new LoginResponse(
    'new_access_token',
    'new_refresh_token'
  );
  const expiredTokenResponse = new APIResponse(401, null, null);
  const dataResponse = new APIResponse(203, null, null);
  let newStoredToken: LoginResponse | null = null;

  function loadToken() {
    return storedExpiredToken;
  }

  function saveToken(token: LoginResponse) {
    newStoredToken = token;
  }

  function refreshToken(accessToken: string): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      resolve(serverNewToken);
    });
  }

  function executeRequest(request: APIRequest): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      if (newStoredToken == null) {
        resolve(expiredTokenResponse);
      } else {
        resolve(dataResponse);
      }
    });
  }

  const sut = authClient(loadToken, saveToken, refreshToken, executeRequest);
  const receivedResponse = (await sut.executeWithAuth(request)) as APIResponse;

  expect(receivedResponse.statusCode).toBe(dataResponse.statusCode);

  if (newStoredToken != null) {
    const token = newStoredToken as LoginResponse;
    expect(token.accessToken).toBe(serverNewToken.accessToken);
    expect(token.refreshToken).toBe(serverNewToken.refreshToken);
  }
});
