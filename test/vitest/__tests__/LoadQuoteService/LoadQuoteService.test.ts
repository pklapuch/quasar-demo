import { InvalidResponseRepresentationError } from 'src/models/InvalidResponseRepresentationError';
import { expect, it } from 'vitest';
import { mapResponse } from 'src/services/LoadQuote/LoadQuoteResponseMapper';
import { APIResponse } from 'src/api/APIModels';

import {
  responseWithOneQuoteTestBundle,
  successStatusCode,
  resposeDataWithEmptyJson,
  failureStatusCodes,
} from './LoadQuoteServiceTestHelpers';
import { mapRequest } from 'src/services/LoadQuote/LoadQuoteRequestMapper';

it('devlivers properly configured request', () => {
  const requset = mapRequest();

  expect(requset.url).toBe('/v1/quotes');
  expect(requset.method).toBe('GET');
  expect(requset.headers).toBe(null);
  expect(requset.body).toBe(null);
});

it('on successful status code and valid response, delivers model', () => {
  const testBundle = responseWithOneQuoteTestBundle();
  const response = new APIResponse(successStatusCode, testBundle.body, null);
  const quote = mapResponse(response);

  expect(quote).toEqual(testBundle.quote);
});

it('on successful status code and invalid response, throws error', () => {
  const response = new APIResponse(
    successStatusCode,
    resposeDataWithEmptyJson,
    null
  );

  try {
    mapResponse(response);
  } catch (error) {
    expect(error instanceof InvalidResponseRepresentationError).toBe(true);
  }
});

it('on non-successful status code and valid response, throws error', () => {
  failureStatusCodes.forEach((failureStatusCode) => {
    const response = new APIResponse(
      failureStatusCode,
      responseWithOneQuoteTestBundle().body,
      null
    );

    try {
      mapResponse(response);
    } catch (error) {
      expect(error instanceof InvalidResponseRepresentationError).toBe(true);
    }
  });
});
