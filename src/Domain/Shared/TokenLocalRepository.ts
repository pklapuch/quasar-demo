import { LoginResponse } from 'src/Domain/Login/LoginResponse';

export interface TokenLocalRepository {
  store(response: LoginResponse): void;

  // Throws is does not exist
  load(): LoginResponse;
}
