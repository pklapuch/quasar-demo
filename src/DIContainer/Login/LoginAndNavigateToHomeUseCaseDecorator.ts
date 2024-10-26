import { LoginUseCase } from 'src/Domain/Login/LoginUseCase';
import { LoginRequest } from 'src/Domain/Login/LoginRequest';
import { Router } from 'vue-router';

export class LoginAndNavigateToHomeUseCaseDecorator implements LoginUseCase {
  decoratee: LoginUseCase;
  router: Router;

  constructor(decoratee: LoginUseCase, router: Router) {
    this.decoratee = decoratee;
    this.router = router;
  }

  async invoke(request: LoginRequest): Promise<void> {
    await this.decoratee.invoke(request);
    this.router.push('/home');
  }
}
