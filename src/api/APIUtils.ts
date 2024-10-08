import { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';
import { Headers } from './APIModels';

export function mapHeaders(
  axiosHeaders: RawAxiosResponseHeaders | AxiosResponseHeaders
) {
  const headers: Headers = {};
  for (const key in axiosHeaders) {
    const value = axiosHeaders[key];
    headers[key] = value;
  }

  return headers;
}
