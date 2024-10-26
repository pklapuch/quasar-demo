import { LoginRequest } from 'src/Domain/Login/LoginRequest';
import { LoginResponse } from 'src/Domain/Login/LoginResponse';

export interface LoginRemoteRepository {
  invoke(request: LoginRequest): Promise<LoginResponse>;
}
