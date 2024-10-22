import isLoggedInUseCase from 'src/services/IsLoggedInUseCase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateRouteUseCase(to: any, from: any, next: any) {
  const isLoggedIn = isLoggedInUseCase().isLoggedIn();
  const toValue = String(to.fullPath);

  console.log(
    `CHECK: from: ${from.fullPath} to: ${to.fullPath} (isLoggedIn: ${isLoggedIn})`
  );

  if (toValue !== 'login' && !isLoggedIn) {
    next({ path: 'login', replace: true });
  } else if (toValue.includes('login') && isLoggedIn) {
    next({ path: 'home', replace: true });
  } else {
    next();
  }
}
