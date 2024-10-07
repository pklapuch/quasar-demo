/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';
import { api } from 'boot/axios';

type Headers = {
  [key: string]: string;
};

// Returns: String
// Throws: any Error
export const loadQuoteFromRemoteService = async function () {
  try {
    const response = await api.get('/v1/quotes');
    const headers = mapHeaders(response.headers);
    return mapResponse(response.data, response.status, headers);
  } catch (error) {
    throw error;
  }
};

function mapHeaders(
  axiosHeaders: RawAxiosResponseHeaders | AxiosResponseHeaders
) {
  const headers: Headers = {};
  for (const key in axiosHeaders) {
    const value = axiosHeaders[key];
    headers[key] = value;
  }

  return headers;
}

// Returns: String
// Throws: InvalidResponseRepresentation Error
function mapResponse(data: [string: any], status: number, headers: Headers) {
  console.log(status);
  console.log(data);
  console.log(headers);

  if (status != 200) {
    throw Error('Invalid Response Representation');
  }

  return data[0].quote;
}
