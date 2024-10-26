import { InjectionKey } from 'vue';
import { LoginUseCase } from 'src/Domain/Login/LoginUseCase';
import { makeContainer } from '../DI/Container';
import { LoginRemoteRepository } from './LoginRemoteRepository';

// Dependencies
export const loginRemoteRepositoryKey: InjectionKey<LoginRemoteRepository> =
  Symbol('loginRemoteRepository');

export const loginUseCaseKey: InjectionKey<LoginUseCase> =
  Symbol('loginUseCase');

// Container Instance
export const loginContainer = makeContainer();
