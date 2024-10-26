import { LoginRequest } from 'src/Domain/Login/LoginRequest';

export interface LoginUseCase {
  invoke(request: LoginRequest): Promise<void>;
}
