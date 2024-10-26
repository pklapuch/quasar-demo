import { expect, it } from 'vitest';
import loginPageModel from 'src/Feature/Login/Presentation/LoginPageModel';
import { LoginRequest } from 'src/Domain/Login/LoginRequest';
import { LoginUseCase } from 'src/Domain/Login/LoginUseCase';

it('when initialized, form is in expected (initial) state', () => {
  const sut = loginPageModel(makeAnyLoginUseCaseMock());

  expect(sut.state.email).toBeFalsy;
  expect(sut.state.isEmailValid).toBe(false);
  expect(sut.state.emailError).toBeFalsy;
  expect(sut.state.password).toBeFalsy;
  expect(sut.state.hidePassword).toBe(true);
  expect(sut.state.isPasswordValid).toBe(false);
  expect(sut.state.passwordError).toBeFalsy;
  expect(sut.state.canSubmit).toBe(false);
});

const anyInvalidEmail = 'abs@@';
const anyValidEmail = 'test@any.com';

const anyInvalidPassword = '';
const anyValidPassword = 'abc@@';

it('when email value changes, email is validated', () => {
  const sut = loginPageModel(makeAnyLoginUseCaseMock());

  simulateEmailEntry(sut, anyInvalidEmail);
  expect(sut.state.isEmailValid).toBe(false);

  simulateEmailEntry(sut, anyValidEmail);
  expect(sut.state.isEmailValid).toBe(true);

  simulateEmailEntry(sut, anyInvalidEmail);
  expect(sut.state.isEmailValid).toBe(false);
});

it('when password value changes, password is validated', () => {
  const sut = loginPageModel(makeAnyLoginUseCaseMock());

  simulatePasswordEntry(sut, anyInvalidPassword);
  expect(sut.state.isPasswordValid).toBe(false);

  simulatePasswordEntry(sut, anyValidPassword);
  expect(sut.state.isPasswordValid).toBe(true);

  simulatePasswordEntry(sut, anyInvalidPassword);
  expect(sut.state.isPasswordValid).toBe(false);
});

it('form can only be submitted if all fields are valid', () => {
  const sut = loginPageModel(makeAnyLoginUseCaseMock());

  simulateEmailEntry(sut, anyValidEmail);
  expect(sut.state.canSubmit).toBe(false);

  simulatePasswordEntry(sut, anyValidPassword);
  expect(sut.state.canSubmit).toBe(true);

  simulateEmailEntry(sut, anyInvalidEmail);
  expect(sut.state.canSubmit).toBe(false);

  simulateEmailEntry(sut, anyValidEmail);
  expect(sut.state.canSubmit).toBe(true);

  simulatePasswordEntry(sut, anyInvalidPassword);
  expect(sut.state.canSubmit).toBe(false);
});

it('on toggle hide password, updates password visibility mode', () => {
  const sut = loginPageModel(makeAnyLoginUseCaseMock());

  expect(sut.state.hidePassword).toBe(true);
  sut.toggleHidePassword();
  expect(sut.state.hidePassword).toBe(false);
  sut.toggleHidePassword();
  expect(sut.state.hidePassword).toBe(true);
});

it('on submit with completed form, login service is invoked', async () => {
  const spy = new LoginUseCaseSpy(() => {
    return Promise.resolve();
  });

  const email = 'test@dot.com';
  const password = 'test_password';

  const sut = loginPageModel(spy);
  simulateEmailEntry(sut, email);
  simulatePasswordEntry(sut, password);
  await sut.submit();

  expect(spy.receivedRequests.length).toBe(1);
  const receivedRequest = spy.receivedRequests[0];

  expect(receivedRequest.email).toBe(email);
  expect(receivedRequest.password).toBe(password);
});

it('isLoading state changnes as login is performed', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, prefer-const
  let sut: any;
  const spy = new LoginUseCaseSpy(() => {
    expect(sut.state.isLoggingIn).toBe(true);
    return Promise.resolve();
  });

  sut = loginPageModel(spy);
  const email = 'test@dot.com';
  const password = 'test_password';

  simulateEmailEntry(sut, email);
  simulatePasswordEntry(sut, password);

  expect(sut.state.isLoggingIn).toBe(false);
  await sut.submit();
  expect(sut.state.isLoggingIn).toBe(false);
});

it('on successful login, submit is disabled', async () => {
  const spy = new LoginUseCaseSpy(() => {
    return Promise.resolve();
  });

  const sut = loginPageModel(spy);

  simulateEmailEntry(sut, anyValidEmail);
  simulatePasswordEntry(sut, anyValidPassword);
  await sut.submit();

  expect(sut.state.canSubmit).toBe(false);
  expect(sut.state.loginError.length).toBe(0);
});

it('on failed login, error is shown', async () => {
  const loginError = Error('Mock Error');
  const spy = new LoginUseCaseSpy(() => {
    return Promise.reject(loginError);
  });

  const sut = loginPageModel(spy);

  simulateEmailEntry(sut, anyValidEmail);
  simulatePasswordEntry(sut, anyValidPassword);
  await sut.submit();

  expect(sut.state.canSubmit).toBe(true);
  expect(sut.state.loginError.length).toBeGreaterThan(0);
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

function makeAnyLoginUseCaseMock(): LoginUseCase {
  const anyError = Error('Any Mock Error');
  return new LoginUseCaseSpy(() => {
    return Promise.reject(anyError);
  });
}

class LoginUseCaseSpy implements LoginUseCase {
  receivedRequests: LoginRequest[] = [];
  action: () => Promise<void>;

  constructor(action: () => Promise<void>) {
    this.action = action;
  }

  async invoke(request: LoginRequest): Promise<void> {
    this.receivedRequests.push(request);
    await this.action();
  }
}
