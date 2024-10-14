import { APIRequest, APIResponse } from 'src/api/APIModels';

export const noAuthHttpClient = async function (
  request: APIRequest
): Promise<APIResponse> {
  return await _noAuthHttpClient(request);
};

export const authHttpClient = async function (
  request: APIRequest
): Promise<APIResponse> {
  return await _authHttpClient(request);
};

export function registerNoAuthHttpClient(
  block: (request: APIRequest) => Promise<APIResponse>
) {
  _noAuthHttpClient = block;
}

export function registerAuthHttpClient(
  block: (request: APIRequest) => Promise<APIResponse>
) {
  _authHttpClient = block;
}

let _noAuthHttpClient = async function (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  request: APIRequest
): Promise<APIResponse> {
  throw Error('Dependency not registered');
};

let _authHttpClient = async function (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  request: APIRequest
): Promise<APIResponse> {
  throw Error('Dependency not registered');
};
