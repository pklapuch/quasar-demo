import { mapResponse } from 'src/services/loadQuoteFromRemoteService';
import { InvalidResponseRepresentationError } from 'src/services/loadQuoteFromRemoteService';
import { expect, expectTypeOf, it } from 'vitest';

const dataWithOneQuote: [string: unknown] = [
  {
    quote: 'mock quote',
  },
];

const emptyJson: [string: unknown] = [];

const successStatusCode = 200;
const failureStatusCode = 400;

it('on successful status code and valid server response, delivers model', () => {
  const quote = mapResponse(dataWithOneQuote, successStatusCode, {});
  expect(quote).toEqual('mock quote');
});

it('on successful status code and invalid server response, throws error', () => {
  try {
    mapResponse(emptyJson, successStatusCode, {});
  } catch (error) {
    expect(error instanceof InvalidResponseRepresentationError).toBe(true);
  }
});

it('on non-successful status code, throws error', () => {
  try {
    mapResponse(dataWithOneQuote, failureStatusCode, {});
  } catch (error) {
    expect(error instanceof InvalidResponseRepresentationError).toBe(true);
  }
});
