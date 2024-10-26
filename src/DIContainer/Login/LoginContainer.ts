import { provide } from 'vue';
import { DefaultLoginRemoteRepository } from 'src/Infrastructure/Login/DefaultLoginRemoteRepository';
import { DefaultLoginUseCase } from 'src/Feature/Login/UseCase/DefaultLoginUseCase';
import { LoginAndNavigateToHomeUseCaseDecorator } from './LoginAndNavigateToHomeUseCaseDecorator';
import { loginUseCaseKey } from 'src/Domain/Login/LoginDependencies';
import { HttpClient } from 'src/Domain/Shared/HttpClient';
import { TokenLocalRepository } from 'src/services/TokenStore/TokenLocalRepository';
import { Router } from 'vue-router';

export function registerLoginDependencies(
  httpClient: HttpClient,
  tokenLocalRepository: TokenLocalRepository,
  router: Router
) {
  const loginRemoteRepository = new DefaultLoginRemoteRepository(httpClient);

  const loginUseCase = new DefaultLoginUseCase(
    loginRemoteRepository,
    tokenLocalRepository
  );

  const loginUseCaseRouterDecorator =
    new LoginAndNavigateToHomeUseCaseDecorator(loginUseCase, router);

  provide(loginUseCaseKey, loginUseCaseRouterDecorator);
}
