import { APIRequest, APIResponse } from 'src/Domain/Shared/APIModels';
import { HttpClient } from 'src/Domain/Shared/HttpClient';
import { logOutgoing, logIncoming, logIncomingError } from './HttpLoggerUtils';

export class HttpClientLogDecorator implements HttpClient {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async execute(request: APIRequest): Promise<APIResponse> {
    logOutgoing(request);

    try {
      const apiResponse = await this.httpClient.execute(request);
      logIncoming(apiResponse, request);
      return apiResponse;
    } catch (error) {
      logIncomingError(error, request);
      throw error;
    }
  }
}
