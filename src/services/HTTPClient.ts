import { api } from 'boot/axios';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { APIRequest, APIResponse } from 'src/api/APIModels';
import { mapHeaders } from 'src/api/APIUtils';

export async function executeHttpRequestWithAxios(request: APIRequest) {
  logOutgoing(request);

  const config: AxiosRequestConfig = {
    url: request.url,
    method: request.method,
    headers: request.headers as AxiosHeaders,
    params: request.body,
  };

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

const baseURL = process.env.API_BASE_URL;

function logOutgoing(request: APIRequest) {
  console.log(
    'OUT Url: ' + baseURL + request.url + ' (' + request.method + ')'
  );
  console.log('OUT Body: ' + JSON.stringify(request.body));
  console.log('OUT Headers: ' + JSON.stringify(request.headers));
}

function logIncoming(response: APIResponse, request: APIRequest) {
  const url = baseURL + request.url;
  const method = request.method;
  const statusCode = response.statusCode;

  console.log('IN Url: ' + url + ' (' + method + ') - ' + statusCode);
  console.log('IN Body: ' + JSON.stringify(response.body));
  console.log('IN Headers: ' + JSON.stringify(response.headers));
}

function logIncomingError(error: unknown, request: APIRequest) {
  const url = baseURL + request.url;
  console.log('IN Url: ' + url + ' (' + request.method + ') - ERROR');
  console.log('IN Error: ' + error);
}
