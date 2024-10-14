import { computed, reactive } from 'vue';
import { LoginForm } from 'src/pages/Login/LoginForm';
import { LoginRequest, loginService } from 'src/DIContainer/LoginContainer';
import { validateEmail, validatePassword } from './LoginFormUtil';

export default function loginPageModel() {
  const form = reactive(new LoginForm());

  const email = computed({
    get() {
      return form.email;
    },
    set(value) {
      form.email = value;
      validateEmailValue();
      updateCanSubmit();
    },
  });

  const password = computed({
    get() {
      return form.password;
    },
    set(value) {
      form.password = value;
      validatePasswordValue();
      updateCanSubmit();
    },
  });

  const loggingIn = computed({
    get() {
      return form.isLoggingIn;
    },
    set(value) {
      form.isLoggingIn = value;
      updateCanSubmit();
    },
  });

  const hasLoggedIn = computed({
    get() {
      return form.hasLoggedIn;
    },
    set(value) {
      form.hasLoggedIn = value;
      updateCanSubmit();
    },
  });

  function validateEmailValue() {
    const result = validateEmail(form.email);
    form.isEmailValid = !result.isInvalid;
    form.emailError = result.errorMessage ?? '';
  }

  function validatePasswordValue() {
    const result = validatePassword(form.password);
    form.isPasswordValid = !result.isInvalid;
    form.passwordError = result.errorMessage ?? '';
  }

  function toggleHidePassword() {
    form.hidePassword = !form.hidePassword;
    updateCanSubmit();
  }

  async function submit() {
    if (!form.canSubmit) {
      return;
    }

    const request = new LoginRequest(
      form.email as string,
      form.password as string
    );

    form.loginError = '';
    loggingIn.value = true;

    try {
      await loginService(request);
      hasLoggedIn.value = true;
      loggingIn.value = false;
    } catch (error) {
      loggingIn.value = false;
      form.loginError = 'Login Failed: ' + error;
    }
  }

  function updateCanSubmit() {
    form.canSubmit =
      form.isEmailValid &&
      form.isPasswordValid &&
      !form.isLoggingIn &&
      !form.hasLoggedIn;
  }

  return {
    form,
    email,
    password,
    toggleHidePassword,
    submit,
  };
}
