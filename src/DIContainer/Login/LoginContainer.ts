import { DefaultLoginRemoteRepository } from 'src/Infrastructure/Login/DefaultLoginRemoteRepository';
import { DefaultLoginUseCase } from 'src/Feature/Login/UseCase/DefaultLoginUseCase';
import { LoginAndNavigateToHomeUseCaseDecorator } from './LoginAndNavigateToHomeUseCaseDecorator';
import {
  loginContainer,
  loginRemoteRepositoryKey,
  loginUseCaseKey,
} from 'src/Domain/Login/LoginDependencies';
import { Router } from 'vue-router';
import {
  noAuthHttpClientKey,
  sharedContainer,
  tokenLocalRepositoryKey,
} from 'src/Domain/Shared/SharedDependencies';

export function registerLoginDependencies(router: Router) {
  registerLoginRemoteRepository();
  registerLoginUseCase(router);
}

// Always create unique instance
function registerLoginRemoteRepository() {
  loginContainer.register(loginRemoteRepositoryKey, () => {
    const httpClient = sharedContainer.resolve(noAuthHttpClientKey);
    return new DefaultLoginRemoteRepository(httpClient);
  });
}

// Always create unique instance
function registerLoginUseCase(router: Router) {
  loginContainer.register(loginUseCaseKey, () => {
    const loginRemoteRepository = loginContainer.resolve(
      loginRemoteRepositoryKey
    );
    const tokenLocalRepository = sharedContainer.resolve(
      tokenLocalRepositoryKey
    );

    const loginUseCase = new DefaultLoginUseCase(
      loginRemoteRepository,
      tokenLocalRepository
    );

    return new LoginAndNavigateToHomeUseCaseDecorator(loginUseCase, router);
  });
}
