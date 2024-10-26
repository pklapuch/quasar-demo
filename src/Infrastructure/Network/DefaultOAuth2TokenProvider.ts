import { OAuth2TokenProvider } from 'src/Domain/Shared/OAuth2TokenProvider';
import { TokenLocalRepository } from 'src/Domain/Shared/TokenLocalRepository';

export class DefaultOAuth2TokenProvider implements OAuth2TokenProvider {
  tokenLocalRepository: TokenLocalRepository;

  constructor(tokenLocalRepository: TokenLocalRepository) {
    this.tokenLocalRepository = tokenLocalRepository;
  }

  getAccessToken(): string {
    const token = this.tokenLocalRepository.load();
    return token.accessToken;
  }

  async refreshAccessToken(): Promise<string> {
    throw Error('Refresh token is not implemented');
  }
}
