import { APIRequest, APIResponse } from 'src/Domain/Shared/APIModels';
import { HttpClient } from 'src/Domain/Shared/HttpClient';
import { mapRequestToConfig } from './AxiosUtils';
import { mapHeaders } from './AxiosUtils';
import { AxiosInstance } from 'axios';

/// Executes non-authorized requests against remote server
export class AxiosHttpClient implements HttpClient {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async execute(request: APIRequest): Promise<APIResponse> {
    const config = mapRequestToConfig(request);
    const axiosResponse = await this.axios.request(config);
    const responseHeaders = mapHeaders(axiosResponse.headers);

    const response = new APIResponse(
      axiosResponse.status,
      axiosResponse.data,
      responseHeaders
    );

    return response;
  }
}
