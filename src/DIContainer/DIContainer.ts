import { registerLoadQuoteService } from './QuoteAppContainer';
import { registerHttpClient } from './CoreContainer';
import { executeHttpRequestWithAxios } from 'src/services/HTTPClient';
import { loadQuoteFromRemote } from 'src/services/LoadQuoteFromRemoteService';
import { registerLoginService } from './LoginContainer';
import { loginRemoteService } from 'src/services/LoginRemoteService';

export const registerDependencies = function () {
  registerHttpClient(executeHttpRequestWithAxios);
  registerLoadQuoteService(loadQuoteFromRemote);
  registerLoginService(loginRemoteService);
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
