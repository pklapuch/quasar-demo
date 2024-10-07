import { api } from 'boot/axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(api);

// Full Documentation: https://www.npmjs.com/package/axios-mock-adapter
// Returns: String
// Throws: Error
export const mockAxiosLoadQuoteFromRemoteWithValidQuote = async function () {
  const json = [
    {
      quote: '1st Mocked Quote',
    },
  ];

  mock.onGet('/v1/quotes').reply(200, json);
};
