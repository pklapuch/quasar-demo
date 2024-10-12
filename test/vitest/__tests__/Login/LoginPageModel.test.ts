import { expect, it } from 'vitest';
import loginPageModel from 'src/pages/Login/LoginPageModel';

import {
  LoginRequest,
  registerLoginService,
} from 'src/DIContainer/LoginContainer';

it('when initialized, form is in expected (initial) state', () => {
  const sut = loginPageModel();

  expect(sut.form.email).toBeFalsy;
  expect(sut.form.isEmailValid).toBe(false);
  expect(sut.form.emailError).toBeFalsy;
  expect(sut.form.password).toBeFalsy;
  expect(sut.form.hidePassword).toBe(true);
  expect(sut.form.isPasswordValid).toBe(false);
  expect(sut.form.passwordError).toBeFalsy;
  expect(sut.form.canSubmit).toBe(false);
});

const anyInvalidEmail = 'abs@@';
const anyValidEmail = 'test@any.com';

const anyInvalidPassword = '';
const anyValidPassword = 'abc@@';

it('when email value changes, form reflects correct state', () => {
  const sut = loginPageModel();

  simulateEmailEntry(sut, anyInvalidEmail);
  expect(sut.form.isEmailValid).toBe(false);

  simulateEmailEntry(sut, anyValidEmail);
  expect(sut.form.isEmailValid).toBe(true);

  simulateEmailEntry(sut, anyInvalidEmail);
  expect(sut.form.isEmailValid).toBe(false);
});

it('when password value changes, form reflects correct state', () => {
  const sut = loginPageModel();

  simulatePasswordEntry(sut, anyInvalidPassword);
  expect(sut.form.isPasswordValid).toBe(false);

  simulatePasswordEntry(sut, anyValidPassword);
  expect(sut.form.isPasswordValid).toBe(true);

  simulatePasswordEntry(sut, anyInvalidPassword);
  expect(sut.form.isPasswordValid).toBe(false);
});

it('form can only be submitted if all fields are valid', () => {
  const sut = loginPageModel();

  simulateEmailEntry(sut, anyValidEmail);
  expect(sut.form.canSubmit).toBe(false);

  simulatePasswordEntry(sut, anyValidPassword);
  expect(sut.form.canSubmit).toBe(true);

  simulateEmailEntry(sut, anyInvalidEmail);
  expect(sut.form.canSubmit).toBe(false);

  simulateEmailEntry(sut, anyValidEmail);
  expect(sut.form.canSubmit).toBe(true);

  simulatePasswordEntry(sut, anyInvalidPassword);
  expect(sut.form.canSubmit).toBe(false);
});

it('on toggle hide password, updates state', () => {
  const sut = loginPageModel();

  expect(sut.form.hidePassword).toBe(true);
  sut.toggleHidePassword();
  expect(sut.form.hidePassword).toBe(false);
  sut.toggleHidePassword();
  expect(sut.form.hidePassword).toBe(true);
});

it('on submit with completed form, login service is invoked', async () => {
  const spy = new LoginServiceSpy();
  mockLoginService(spy);

  const email = 'test@dot.com';
  const password = 'test_password';

  const sut = loginPageModel();
  simulateEmailEntry(sut, email);
  simulatePasswordEntry(sut, password);
  await sut.submit();

  expect(spy.receivedRequests.length).toBe(1);
  const receivedRequest = spy.receivedRequests[0];

  expect(receivedRequest.email).toBe(email);
  expect(receivedRequest.password).toBe(password);
});

it('isLoading state changnes as login is performed', async () => {
  const sut = loginPageModel();
  const loginServicePromise: Promise<void> = new Promise((resolve) => {
    expect(sut.form.isLoggingIn).toBe(true);
    resolve();
  });
  mockLoginServiceWithPromise(loginServicePromise);

  const email = 'test@dot.com';
  const password = 'test_password';

  simulateEmailEntry(sut, email);
  simulatePasswordEntry(sut, password);
  await sut.submit();
  expect(sut.form.isLoggingIn).toBe(false);
});

// - MARK: Helpers

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function simulateEmailEntry(sut: any, value: string) {
  sut.email.value = value;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function simulatePasswordEntry(sut: any, value: string) {
  sut.password.value = value;
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
