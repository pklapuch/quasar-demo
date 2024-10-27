import { LoginUseCase } from 'src/Domain/Login/LoginUseCase';
import { LoginRequest } from 'src/Domain/Login/LoginRequest';
import { LoginError } from 'src/Feature/Login/Presentation/LoginError';

export class LoginUseCaseErrorMapperDecorator implements LoginUseCase {
  decoratee: LoginUseCase;
  errorMapper = new LoginErrorMapper();

  constructor(decoratee: LoginUseCase) {
    this.decoratee = decoratee;
  }

  invoke(request: LoginRequest): Promise<void> {
    try {
      return this.decoratee.invoke(request);
    } catch (error) {
      throw this.errorMapper.mapError(error);
    }
  }
}

class LoginErrorMapper {
  mapError(error: unknown): LoginError {
    if (error instanceof Error) {
      return new LoginError('Something went wrong :(');
    } else {
      return new LoginError('Please try again later');
    }
  }
}
