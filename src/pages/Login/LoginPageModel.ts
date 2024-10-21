import { computed, reactive } from 'vue';
import { LoginPageState } from 'src/pages/Login/LoginPageState';
import { LoginRequest } from 'src/models/LoginRequest';
import { loginService } from 'src/DIContainer/LoginContainer';
import { validateEmail, validatePassword } from './LoginFormUtil';

export default function loginPageModel() {
  const state = reactive(new LoginPageState());

  const email = computed({
    get() {
      return state.email;
    },
    set(value) {
      state.email = value;
      validateEmailValue();
      updateCanSubmit();
    },
  });

  const password = computed({
    get() {
      return state.password;
    },
    set(value) {
      state.password = value;
      validatePasswordValue();
      updateCanSubmit();
    },
  });

  const loggingIn = computed({
    get() {
      return state.isLoggingIn;
    },
    set(value) {
      state.isLoggingIn = value;
      updateCanSubmit();
    },
  });

  const hasLoggedIn = computed({
    get() {
      return state.hasLoggedIn;
    },
    set(value) {
      state.hasLoggedIn = value;
      updateCanSubmit();
    },
  });

  function validateEmailValue() {
    const result = validateEmail(state.email);
    state.isEmailValid = !result.isInvalid;
    state.emailError = result.errorMessage ?? '';
  }

  function validatePasswordValue() {
    const result = validatePassword(state.password);
    state.isPasswordValid = !result.isInvalid;
    state.passwordError = result.errorMessage ?? '';
  }

  function toggleHidePassword() {
    state.hidePassword = !state.hidePassword;
    updateCanSubmit();
  }

  async function submit() {
    if (!state.canSubmit) {
      return;
    }

    const request = new LoginRequest(
      state.email as string,
      state.password as string
    );

    state.loginError = '';
    loggingIn.value = true;

    try {
      await loginService(request);
      hasLoggedIn.value = true;
      loggingIn.value = false;
    } catch (error) {
      loggingIn.value = false;
      state.loginError = 'Login Failed: ' + error;
    }
  }

  function updateCanSubmit() {
    state.canSubmit =
      state.isEmailValid &&
      state.isPasswordValid &&
      !state.isLoggingIn &&
      !state.hasLoggedIn;
  }

  return {
    state,
    email,
    password,
    toggleHidePassword,
    submit,
  };
}
