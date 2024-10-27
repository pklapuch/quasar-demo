import { loginContainer } from 'src/Domain/Login/LoginDependencies';
import { loginUseCaseKey } from 'src/Domain/Login/LoginDependencies';
import loginPageModel from 'src/Feature/Login/Presentation/LoginPageModel';

export default function loginComposer() {
  function makePageModel() {
    const loginUseCase = loginContainer.resolve(loginUseCaseKey);
    return loginPageModel(loginUseCase);
  }

  return { makePageModel };
}
