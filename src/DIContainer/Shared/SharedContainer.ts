import {
  sharedContainer,
  tokenLocalRepositoryKey,
  noAuthHttpClientKey,
} from 'src/Domain/Shared/SharedDependencies';

import { AxiosHttpClient } from 'src/Infrastructure/Network/AxiosHttpClient';
import { HttpClientLogDecorator } from 'src/Infrastructure/Network/HttpClientLogDecorator';
import { CookieTokenLocalRepository } from 'src/Infrastructure/OAuth2/CookieTokenLocalRepository';
import { api } from 'src/boot/axios';

export function registerSharedDependencies() {
  registerNoAuthHttpClient();
  registerTokenLocalRepository();
}

/// Always create unique instance
function registerNoAuthHttpClient() {
  sharedContainer.register(noAuthHttpClientKey, () => {
    const axiosHttpClient = new AxiosHttpClient(api);
    return new HttpClientLogDecorator(axiosHttpClient);
  });
}

/// Always create unique instance
function registerTokenLocalRepository() {
  sharedContainer.register(tokenLocalRepositoryKey, () => {
    return new CookieTokenLocalRepository();
  });
}
