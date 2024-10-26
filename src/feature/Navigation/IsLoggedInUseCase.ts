import { TokenLocalRepository } from '../../Domain/Shared/TokenLocalRepository';

export class IsLoggedInUseCase {
  tokenRepository: TokenLocalRepository;

  constructor(tokenRepository: TokenLocalRepository) {
    this.tokenRepository = tokenRepository;
  }

  isLoggedIn(): boolean {
    const token = this.loadTokenOrNull();
    return token != null;
  }

  loadTokenOrNull() {
    try {
      return this.tokenRepository.load();
    } catch (e) {
      return null;
    }
  }
}
