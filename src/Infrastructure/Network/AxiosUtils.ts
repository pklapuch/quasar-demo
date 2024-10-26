import { APIRequest } from 'src/Domain/Shared/APIModels';
import { Headers } from 'src/Domain/Shared/APIModels';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';

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

export function mapRequestToConfig(request: APIRequest): AxiosRequestConfig {
  return {
    url: request.url,
    method: request.method,
    data: request.body,
    headers: request.headers as AxiosHeaders,
  };
}
