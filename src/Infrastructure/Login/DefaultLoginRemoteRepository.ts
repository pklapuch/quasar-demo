import { LoginRemoteRepository } from 'src/Domain/Login/LoginRemoteRepository';
import { LoginRequest } from 'src/Domain/Login/LoginRequest';
import { LoginResponse } from 'src/Domain/Login/LoginResponse';
import { HttpClient } from 'src/Domain/Shared/HttpClient';
import { mapRequest } from './LoginRequestMapper';
import { mapResponse } from './LoginResponseMapper';

/// Represents production-grade repository (remote server - invoking this repository will trigger network calls)
export class DefaultLoginRemoteRepository implements LoginRemoteRepository {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async invoke(request: LoginRequest): Promise<LoginResponse> {
    const apiRequest = mapRequest(request);
    const apiResponse = await this.httpClient.execute(apiRequest);
    return mapResponse(apiResponse);
  }
}
