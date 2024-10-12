import { expect, it } from 'vitest';
import {
  form,
  didUpdateEmail,
  didUpdatePassword,
  toggleHidePassword,
  submit,
} from 'src/pages/Login/LoginPageModel';
import {
  LoginRequest,
  registerLoginService,
} from 'src/DIContainer/LoginContainer';

it('when initialized, form is in expected (initial) state', () => {
  expect(form.email).toBeFalsy;
  expect(form.isEmailValid).toBe(false);
  expect(form.emailError).toBeFalsy;
  expect(form.password).toBeFalsy;
  expect(form.hidePassword).toBe(true);
  expect(form.isPasswordValid).toBe(false);
  expect(form.passwordError).toBeFalsy;
  expect(form.canSubmit).toBe(false);
});

const anyInvalidEmail = 'abs@@';
const anyValidEmail = 'test@any.com';

const anyInvalidPassword = '';
const anyValidPassword = 'abc@@';

it('when email value changes, form reflects correct state', () => {
  simulateEmailEntry(anyInvalidEmail);
  expect(form.isEmailValid).toBe(false);

  simulateEmailEntry(anyValidEmail);
  expect(form.isEmailValid).toBe(true);

  simulateEmailEntry(anyInvalidEmail);
  expect(form.isEmailValid).toBe(false);
});

it('when password value changes, form reflects correct state', () => {
  simulatePasswordEntry(anyInvalidPassword);
  expect(form.isPasswordValid).toBe(false);

  simulatePasswordEntry(anyValidPassword);
  expect(form.isPasswordValid).toBe(true);

  simulatePasswordEntry(anyInvalidPassword);
  expect(form.isPasswordValid).toBe(false);
});

it('form can only be submitted if all fields are valid', () => {
  simulateEmailEntry(anyValidEmail);
  expect(form.canSubmit).toBe(false);

  simulatePasswordEntry(anyValidPassword);
  expect(form.canSubmit).toBe(true);

  simulateEmailEntry(anyInvalidEmail);
  expect(form.canSubmit).toBe(false);

  simulateEmailEntry(anyValidEmail);
  expect(form.canSubmit).toBe(true);

  simulatePasswordEntry(anyInvalidPassword);
  expect(form.canSubmit).toBe(false);
});

it('on toggle hide password, updates state', () => {
  expect(form.hidePassword).toBe(true);
  toggleHidePassword();
  expect(form.hidePassword).toBe(false);
  toggleHidePassword();
  expect(form.hidePassword).toBe(true);
});

it('on submit with completed form, login service is invoked', async () => {
  const spy = new LoginServiceSpy();
  mockLoginService(spy);

  const email = 'test@dot.com';
  const password = 'test_password';

  simulateEmailEntry(email);
  simulatePasswordEntry(password);
  await submit();

  expect(spy.receivedRequests.length).toBe(1);
  const receivedRequest = spy.receivedRequests[0];

  expect(receivedRequest.email).toBe(email);
  expect(receivedRequest.password).toBe(password);
});

it('isLoading state changnes as login is performed', async () => {
  const loginServicePromise: Promise<void> = new Promise((resolve) => {
    expect(form.isLoggingIn).toBe(true);
    resolve();
  });
  mockLoginServiceWithPromise(loginServicePromise);

  const email = 'test@dot.com';
  const password = 'test_password';

  simulateEmailEntry(email);
  simulatePasswordEntry(password);
  await submit();
  expect(form.isLoggingIn).toBe(false);
});

// - MARK: Helpers

function simulateEmailEntry(value: string) {
  form.email = value;
  didUpdateEmail();
}

function simulatePasswordEntry(value: string) {
  form.password = value;
  didUpdatePassword();
}

// - MARK: Login Service Mock

class LoginServiceSpy {
  receivedRequests: LoginRequest[] = [];
}

function mockLoginService(spy: LoginServiceSpy) {
  async function loginServiceSpy(request: LoginRequest) {
    spy.receivedRequests.push(request);
  }
  registerLoginService(loginServiceSpy);
}

function mockLoginServiceWithPromise(promise: Promise<void>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function loginServiceSpy(request: LoginRequest) {
    await promise;
  }
  registerLoginService(loginServiceSpy);
}
