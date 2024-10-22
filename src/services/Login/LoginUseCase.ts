import { loginRemoteRepository } from './LoginRemoteRepository';
import { storeTokenService } from 'src/DIContainer/TokenStoreContainer';
import { LoginRequest } from 'src/models/LoginRequest';

export default function loginUseCase() {
  async function login(request: LoginRequest) {
    const loginResponse = await loginRemoteRepository().login(request);
    storeTokenService(loginResponse);
  }

  return {
    login,
  };
}
