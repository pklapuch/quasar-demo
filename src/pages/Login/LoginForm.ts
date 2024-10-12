import { validateEmail, validatePassword } from './LoginFormUtil';

export class LoginForm {
  email: string | null;
  emailError: string;
  isEmailValid: boolean;

  password: string | null;
  hidePassword: boolean;
  passwordError: string;
  isPasswordValid: boolean;

  isLoggingIn: boolean;
  canSubmit: boolean;

  constructor() {
    this.email = null;
    this.emailError = '';
    this.isEmailValid = false;

    this.password = null;
    this.hidePassword = true;
    this.passwordError = '';
    this.isPasswordValid = false;

    this.isLoggingIn = false;
    this.canSubmit = false;
  }
}

export function didUpdateEmailInForm(form: LoginForm) {
  const result = validateEmail(form.email);
  form.isEmailValid = !result.isInvalid;
  form.emailError = result.errorMessage ?? '';
  didUpdate(form);
}

export function didUpdatePasswordInForm(form: LoginForm) {
  const result = validatePassword(form.password);
  form.isPasswordValid = !result.isInvalid;
  form.passwordError = result.errorMessage ?? '';
  didUpdate(form);
}

export function setLoggingIn(form: LoginForm, state: boolean) {
  form.isLoggingIn = state;
  didUpdate(form);
}

export function toggleHidePasswordInForm(form: LoginForm) {
  form.hidePassword = !form.hidePassword;
  didUpdate(form);
}

function didUpdate(form: LoginForm) {
  form.canSubmit =
    form.isEmailValid && form.isPasswordValid && !form.isLoggingIn;
}
