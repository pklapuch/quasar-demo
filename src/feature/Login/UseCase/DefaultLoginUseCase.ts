import { LoginUseCase } from '../../../Domain/Login/LoginUseCase';
import { LoginRequest } from 'src/Domain/Login/LoginRequest';
import { LoginRemoteRepository } from '../../../Domain/Login/LoginRemoteRepository';
import { TokenLocalRepository } from '../../../services/TokenStore/TokenLocalRepository';

/// Represents production-grade login use case.
export class DefaultLoginUseCase implements LoginUseCase {
  tokenRemoteRepository: LoginRemoteRepository;
  tokenLocalReposiotry: TokenLocalRepository;

  constructor(
    tokenRemoteRepository: LoginRemoteRepository,
    tokenLocalReposiotry: TokenLocalRepository
  ) {
    this.tokenRemoteRepository = tokenRemoteRepository;
    this.tokenLocalReposiotry = tokenLocalReposiotry;
  }

  async invoke(request: LoginRequest): Promise<void> {
    const loginResponse = await this.tokenRemoteRepository.invoke(request);
    this.tokenLocalReposiotry.store(loginResponse);
  }
}
