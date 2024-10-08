import { APIRequest, APIResponse } from 'src/api/APIModels';

// - HTTPClient Service
// Returns: Promise<APIResponse>
// Throws: Error
export const httpClient = async function (
  request: APIRequest
): Promise<APIResponse> {
  return await _httpClient(request);
};

export function registerHttpClient(
  block: (request: APIRequest) => Promise<APIResponse>
) {
  _httpClient = block;
}

// Returns: Promise<APIResponse>
// Throws: Error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let _httpClient = async function (request: APIRequest): Promise<APIResponse> {
  throw Error('Dependency not registered');
};
