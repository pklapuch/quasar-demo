import { registerLoadQuoteService } from './QuoteAppContainer';
import { registerNoAuthHttpClient } from './NoAuthHttpClientContainer';
import { registerAuthHttpClient } from './AuthHttpClientContainer';
import {
  executeHttpRequestWithAxios,
  executeHttpRequestWithAxiosWithAuth,
} from 'src/services/HTTPClient/HTTPClient';
import { loadQuoteFromRemote } from 'src/services/LoadQuote/LoadQuoteFromRemoteService';
import { registerLoginService } from './LoginContainer';
import loginUseCase from 'src/services/Login/LoginUseCase';

import { loadTokenService } from 'src/services/TokenStore/TokenStoreCookieService';
import { registerLoadTokenService } from './TokenStoreContainer';
import { storeTokenService } from 'src/services/TokenStore/TokenStoreCookieService';
import { registerStoreTokenService } from './TokenStoreContainer';

export const registerDependencies = function () {
  registerNoAuthHttpClient(executeHttpRequestWithAxios);
  registerAuthHttpClient(executeHttpRequestWithAxiosWithAuth);
  registerLoadQuoteService(loadQuoteFromRemote);
  registerLoginService(loginAndPushHome);
  registerLoadTokenService(loadTokenService);
  registerStoreTokenService(storeTokenService);
  registerMockDependencies();
};

// MOCK

import { LoginResponse } from 'src/models/LoginResponse';

export function registerMockDependencies() {
  // Mock dependencies as needed
  // registerLoadTokenService(() => {
  //   return new LoginResponse('access', 'refresh');
  // });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // registerLoginService((request: LoginRequest) => {
  //   return new Promise((resolve, reject) => {
  //     reject(Error('Some Error'));
  //   });
  // });
}

import { appRouter } from 'src/router';
import { LoginRequest } from 'src/models/LoginRequest';

// Custom Behaviour

async function loginAndPushHome(request: LoginRequest) {
  await loginUseCase().login(request);

  try {
    appRouter.push('/home');
  } catch (error) {
    console.log('error: ' + error);
  }
}

// Mocking examples
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { mockAxiosLoadQuoteFromRemoteWithValidQuote } from 'src/mockServices/axiosLoadQuoteFromRemoteMock';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { loadQuoteMockService } from 'src/mockServices/loadQuoteMockService';

// registerLoadQuoteService(loadQuoteMockService);
// mockAxisssosLoadQuoteFromRemoteWithValidQuote();
