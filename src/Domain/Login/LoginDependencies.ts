import { InjectionKey } from 'vue';
import { LoginUseCase } from 'src/Domain/Login/LoginUseCase';

export const loginUseCaseKey: InjectionKey<LoginUseCase> =
  Symbol('loginUseCase');
