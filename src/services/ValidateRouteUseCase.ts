import isLoggedInUseCase from 'src/services/IsLoggedInUseCase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateRouteUseCase(to: any, from: any, next: any) {
  const isLoggedIn = isLoggedInUseCase().isLoggedIn();
  const fromValue = String(from.fullPath);
  const toValue = String(to.fullPath);

  console.log(
    `CHECK: from: ${fromValue} to: ${toValue} (isLoggedIn: ${isLoggedIn})`
  );

  if (!isLoggedIn) {
    validateRouteWhenLoggedOut(to, from, next);
  } else {
    validateRouteWhenLoggedIn(to, from, next);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateRouteWhenLoggedIn(to: any, from: any, next: any) {
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
function validateRouteWhenLoggedOut(to: any, from: any, next: any) {
  const toValue = String(to.fullPath);
  const fromValue = String(from.fullPath);

  if (toValue == '/') {
    console.log(`trying to go from ${fromValue}  to root -> force login`);
    next({ path: 'login', replace: true });
    return;
  }

  if (toValue !== '/login') {
    console.log(`trying to go from ${fromValue} to ${toValue}  -> force login`);
    next({ path: 'login', replace: true });
    return;
  }

  console.log(`trying to go from ${fromValue} to ${toValue}  -> allow`);
  next();
}
