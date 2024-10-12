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
