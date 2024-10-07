import { loadQuoteFromRemoteService } from 'src/services/loadQuoteFromRemoteService';
import { registerLoadQuoteService } from './QuoteAppContainer';

export const registerDependencies = function () {
  registerLoadQuoteService(loadQuoteFromRemoteService);
};

// MOCK

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { mockAxiosLoadQuoteFromRemoteWithValidQuote } from 'src/mockServices/axiosLoadQuoteFromRemoteMock';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { loadQuoteMockService } from 'src/mockServices/loadQuoteMockService';

export function registerMockDependencies() {
  // registerLoadQuoteService(loadQuoteMockService);
  // mockAxiosLoadQuoteFromRemoteWithValidQuote();
}
