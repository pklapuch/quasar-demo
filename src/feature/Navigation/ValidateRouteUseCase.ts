import { IsLoggedInUseCase } from './IsLoggedInUseCase';

export class ValidateRouteUseCase {
  isLoggedInUseCase: IsLoggedInUseCase;

  constructor(isLoggedInUseCase: IsLoggedInUseCase) {
    this.isLoggedInUseCase = isLoggedInUseCase;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(to: any, from: any, next: any) {
    const isLoggedIn = this.isLoggedInUseCase.isLoggedIn();
    const fromValue = String(from.fullPath);
    const toValue = String(to.fullPath);

    console.log(
      `CHECK: from: ${fromValue} to: ${toValue} (isLoggedIn: ${isLoggedIn})`
    );

    if (!isLoggedIn) {
      this.validateRouteWhenLoggedOut(to, from, next);
    } else {
      this.validateRouteWhenLoggedIn(to, from, next);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateRouteWhenLoggedIn(to: any, from: any, next: any) {
    const toValue = String(to.fullPath);
    const fromValue = String(from.fullPath);

    if (toValue.includes('login')) {
      console.log(`trying to go from ${fromValue}  to root -> force login`);
      next({ path: 'home', replace: true });
      return;
    }

    next();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateRouteWhenLoggedOut(to: any, from: any, next: any) {
    const toValue = String(to.fullPath);
    const fromValue = String(from.fullPath);

    if (toValue == '/') {
      console.log(`trying to go from ${fromValue}  to root -> force login`);
      next({ path: 'login', replace: true });
      return;
    }

    if (toValue !== '/login') {
      console.log(
        `trying to go from ${fromValue} to ${toValue}  -> force login`
      );
      next({ path: 'login', replace: true });
      return;
    }

    console.log(`trying to go from ${fromValue} to ${toValue}  -> allow`);
    next();
  }
}
