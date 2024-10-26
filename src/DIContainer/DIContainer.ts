import { AxiosHttpClient } from 'src/Infrastructure/Network/AxiosHttpClient';
import { HttpClientLogDecorator } from 'src/Infrastructure/Network/HttpClientLogDecorator';
import { HttpClient } from 'src/Domain/Shared/HttpClient';
import { registerLoginDependencies } from './Login/LoginContainer';
import { api } from 'src/boot/axios';

import { ValidateRouteUseCase } from 'src/Feature/Navigation/ValidateRouteUseCase';
import { CookieTokenLocalRepository } from 'src/services/TokenStore/CookieTokenLocalRepository';
import { IsLoggedInUseCase } from 'src/Feature/Navigation/IsLoggedInUseCase';
import { Router } from 'vue-router';
import { TokenLocalRepository } from 'src/services/TokenStore/TokenLocalRepository';
import { DefaultOAuth2TokenProvider } from 'src/Infrastructure/Network/DefaultOAuth2TokenProvider';
import { OAuth2HttpClientDecorator } from 'src/Infrastructure/Network/OAuth2HttpClientDecorator';

export const registerDependencies = function (router: Router) {
  const noAuthHttpClient = makeNoAuthHttpClient();
  const tokenLocalRepository = new CookieTokenLocalRepository();
  const authHttpClient = makeAuthHttpClient(
    noAuthHttpClient,
    tokenLocalRepository
  );

  const validateRouteUseCase = makeValidateRouteUseCase(tokenLocalRepository);

  router.beforeResolve((to, from, next) => {
    //initialRouteMockService('test', '/test').invoke(to, from, next);
    validateRouteUseCase.validate(to, from, next);
  });

  registerLoginDependencies(noAuthHttpClient, tokenLocalRepository, router);
};

function makeNoAuthHttpClient(): HttpClient {
  const axiosHttpClient = new AxiosHttpClient(api);
  return new HttpClientLogDecorator(axiosHttpClient);
}

function makeAuthHttpClient(
  noAuthHttpClient: HttpClient,
  tokenLocalRepository: TokenLocalRepository
): HttpClient {
  const oauth2TokenProvider = new DefaultOAuth2TokenProvider(
    tokenLocalRepository
  );

  return new OAuth2HttpClientDecorator(noAuthHttpClient, oauth2TokenProvider);
}

function makeValidateRouteUseCase(
  tokenLocalRepository: TokenLocalRepository
): ValidateRouteUseCase {
  const isLoggedInUseCase = new IsLoggedInUseCase(tokenLocalRepository);
  return new ValidateRouteUseCase(isLoggedInUseCase);
}
