import { InjectionKey } from 'vue';
import { makeContainer } from '../DI/Container';
import { TokenLocalRepository } from 'src/Domain/Shared/TokenLocalRepository';
import { HttpClient } from './HttpClient';

// Dependencies
export const tokenLocalRepositoryKey: InjectionKey<TokenLocalRepository> =
  Symbol('tokenLocalRepository');

export const noAuthHttpClientKey: InjectionKey<HttpClient> =
  Symbol('noAuthHttpClient');

// Container Instance
export const sharedContainer = makeContainer();
