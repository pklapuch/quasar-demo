/* eslint-disable @typescript-eslint/no-explicit-any */
import { mapRequest } from './LoadQuoteRequestMapper';
import { httpClient } from 'src/DIContainer/CoreContainer';
import { mapResponse } from './LoadQuoteResponseMapper';

// Returns: Promise<String>
// Throws: any Error
export const loadQuoteFromRemote = async function () {
  try {
    const request = mapRequest();
    const response = await httpClient(request);
    return mapResponse(response);
  } catch (error) {
    throw error;
  }
};
