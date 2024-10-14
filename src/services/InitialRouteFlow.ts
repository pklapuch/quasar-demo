import { appRouter } from 'src/router';
import { getCookie } from 'src/services/CookieUtil';

export function navigateToInitialScreen() {
  const token = getCookie('access_token');

  if (token == null) {
    console.log('Go to login');
    appRouter.push('/login');
  } else {
    console.log('Go to home');
    appRouter.push('/home');
  }
}
