import { registerLoadQuoteService } from './QuoteAppContainer';
import {
  registerNoAuthHttpClient,
  registerAuthHttpClient,
} from './CoreContainer';
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
  registerLoginService(loginAndGetData);
  registerMockDependencies();
};

// MOCK

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { mockAxiosLoadQuoteFromRemoteWithValidQuote } from 'src/mockServices/axiosLoadQuoteFromRemoteMock';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { loadQuoteMockService } from 'src/mockServices/loadQuoteMockService';

export function registerMockDependencies() {
  // registerLoadQuoteService(loadQuoteMockService);
  // mockAxisssosLoadQuoteFromRemoteWithValidQuote();
}

import { LoginRequest } from './LoginContainer';
import { appRouter } from 'src/router/index';

async function loginAndGetData(request: LoginRequest) {
  await loginRemoteService(request);

  try {
    appRouter.push('/home');
  } catch (error) {
    console.log('error: ' + error);
  }
}
