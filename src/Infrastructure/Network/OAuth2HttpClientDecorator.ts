import { HttpClient } from 'src/Domain/Shared/HttpClient';
import { OAuth2TokenProvider } from 'src/Domain/Shared/OAuth2TokenProvider';
import { APIRequest, APIResponse } from 'src/Domain/Shared/APIModels';

export class OAuth2HttpClientDecorator implements HttpClient {
  httpClient: HttpClient;
  tokenProvider: OAuth2TokenProvider;

  constructor(httpClient: HttpClient, tokenProvider: OAuth2TokenProvider) {
    this.httpClient = httpClient;
    this.tokenProvider = tokenProvider;
  }

  execute(request: APIRequest): Promise<APIResponse> {
    const token = this.tokenProvider.getAccessToken();
    const signedRequest = this.signRequestWithToken(token, request);

    // TODO: Implement 401 error handling etc... (low prio)

    return this.httpClient.execute(signedRequest);
  }

  signRequestWithToken(token: string, request: APIRequest): APIRequest {
    const headers = request.headers ?? {};
    headers['Authorization'] = token;
    return new APIRequest(request.url, request.method, request.body, headers);
  }
}
