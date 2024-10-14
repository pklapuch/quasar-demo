import { api } from 'boot/axios';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { APIRequest, APIResponse } from 'src/api/APIModels';
import { mapHeaders } from 'src/api/APIUtils';
import { logOutgoing, logIncoming, logIncomingError } from './HTTPUtils';
import { getCookie } from '../CookieUtil';

export async function executeHttpRequestWithAxios(
  request: APIRequest
): Promise<APIResponse> {
  logOutgoing(request);
  return await executeRequest(request);
}

export async function executeHttpRequestWithAxiosWithAuth(
  request: APIRequest
): Promise<APIResponse> {
  const signedRequest = signRequest(request);

  logOutgoing(signedRequest);
  const response = await executeRequest(signedRequest);

  if (response.statusCode == 401) {
    // TODO: Refresh token
    throw Error('Unauthorized: Refresh token flow is not yet implemented!');
  }

  return response;
}

async function executeRequest(request: APIRequest) {
  const config = mapRequestToConfig(request);

  try {
    const axiosResponse = await api.request(config);
    const responseHeaders = mapHeaders(axiosResponse.headers);
    const response = new APIResponse(
      axiosResponse.status,
      axiosResponse.data,
      responseHeaders
    );

    logIncoming(response, request);

    return response;
  } catch (error) {
    logIncomingError(error, request);
    throw error;
  }
}

function mapRequestToConfig(request: APIRequest): AxiosRequestConfig {
  return {
    url: request.url,
    method: request.method,
    data: request.body,
    headers: request.headers as AxiosHeaders,
  };
}

function signRequest(request: APIRequest): APIRequest {
  const token = getCookie('access_token');

  if (token == undefined) {
    throw Error('Access token is missing');
  }

  return signRequestWithToken(token, request);
}

export function signRequestWithToken(
  token: string,
  request: APIRequest
): APIRequest {
  const headers = request.headers ?? {};
  headers['Authorization'] = token;
  return new APIRequest(request.url, request.method, request.body, headers);
}
