import { reactive } from 'vue';

import {
  LoginForm,
  didUpdateEmailInForm,
  didUpdatePasswordInForm,
  toggleHidePasswordInForm,
  setLoggingIn,
} from 'src/pages/Login/LoginForm';
import { LoginRequest, loginService } from 'src/DIContainer/LoginContainer';

export const form = reactive(new LoginForm());

export const didUpdateEmail = () => {
  didUpdateEmailInForm(form);
};

export const didUpdatePassword = () => {
  didUpdatePasswordInForm(form);
};

export const toggleHidePassword = () => {
  toggleHidePasswordInForm(form);
};

export const isSubmitEnabled = () => {
  return form.canSubmit;
};

export const submit = async () => {
  if (!form.canSubmit) {
    return;
  }

  const request = new LoginRequest(
    form.email as string,
    form.password as string
  );

  try {
    setLoggingIn(form, true);
    await loginService(request);
    setLoggingIn(form, false);
  } catch (error) {
    setLoggingIn(form, false);
    // TODO: Implement me
  }
};
