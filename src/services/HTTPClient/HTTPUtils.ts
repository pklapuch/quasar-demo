import { APIRequest, APIResponse } from 'src/api/APIModels';

const baseURL = process.env.API_BASE_URL;

export function logOutgoing(request: APIRequest) {
  const url = extractRequsetURL(request);
  console.log('OUT Url: ' + url + ' (' + request.method + ')');
  console.log('OUT Body: ' + JSON.stringify(request.body));
  console.log('OUT Headers: ' + JSON.stringify(request.headers));
}

export function logIncoming(response: APIResponse, request: APIRequest) {
  const url = extractRequsetURL(request);
  const method = request.method;
  const statusCode = response.statusCode;

  console.log('IN Url: ' + url + ' (' + method + ') - ' + statusCode);
  console.log('IN Body: ' + JSON.stringify(response.body));
  console.log('IN Headers: ' + JSON.stringify(response.headers));
}

export function logIncomingError(error: unknown, request: APIRequest) {
  const url = extractRequsetURL(request);
  console.log('IN Url: ' + url + ' (' + request.method + ') - ERROR');
  console.log('IN Error: ' + error);
}

function extractRequsetURL(request: APIRequest): string {
  return request.url.startsWith('http') ? request.url : baseURL + request.url;
}
