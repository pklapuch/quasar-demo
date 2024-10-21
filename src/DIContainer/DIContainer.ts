import { registerLoadQuoteService } from './QuoteAppContainer';
import { registerNoAuthHttpClient } from './NoAuthHttpClientContainer';
import { registerAuthHttpClient } from './AuthHttpClientContainer';
import {
  executeHttpRequestWithAxios,
  executeHttpRequestWithAxiosWithAuth,
} from 'src/services/HTTPClient/HTTPClient';
import { loadQuoteFromRemote } from 'src/services/LoadQuote/LoadQuoteFromRemoteService';
import { registerLoginService } from './LoginContainer';
import { loginRemoteService } from 'src/services/Login/LoginRemoteService';

export const registerDependencies = function () {
  registerNoAuthHttpClient(executeHttpRequestWithAxios);
  registerAuthHttpClient(executeHttpRequestWithAxiosWithAuth);
  registerLoadQuoteService(loadQuoteFromRemote);
  registerLoginService(loginAndPushHome);
  registerMockDependencies();
};

// MOCK

export function registerMockDependencies() {
  // Mock dependencies as needed
}

import { appRouter } from 'src/router/index';
import { LoginRequest } from 'src/models/LoginRequest';

// Custom Behaviour

async function loginAndPushHome(request: LoginRequest) {
  await loginRemoteService(request);

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
