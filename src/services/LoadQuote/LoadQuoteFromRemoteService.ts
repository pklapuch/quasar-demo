/* eslint-disable @typescript-eslint/no-explicit-any */
import { mapRequest } from 'src/services/LoadQuote/LoadQuoteRequestMapper';
import { authHttpClient } from 'src/DIContainer/AuthHttpClientContainer';
import { mapResponse } from 'src/services/LoadQuote/LoadQuoteResponseMapper';

// Returns: Promise<String>
// Throws: any Error
export async function loadQuoteFromRemote() {
  try {
    const request = mapRequest();
    const response = await authHttpClient(request);
    return mapResponse(response);
  } catch (error) {
    throw error;
  }
}
