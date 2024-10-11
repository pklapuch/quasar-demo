<template>
  <q-page>
    <div class="row">
      <div class="col-12 col-md-4 col-lg-4 q-pa-xl">
        <div class="text-center">
          <q-img class="logo" src="src/assets/login.svg" />
        </div>
        <div class="column">
          <q-input
            label="Enter Email"
            rounded
            outlined
            v-model="form.email.value"
            @update:model-value="didUpdateEmail"
            :error="form.email.isInvalidInput"
            :error-message="form.email.errorMessage"
          >
            <template v-slot:prepend>
              <q-icon name="email"> </q-icon>
            </template>
          </q-input>
        </div>

        <div class="column">
          <q-input
            label="Enter Password"
            class="q-mt-sm"
            rounded
            outlined
            v-model="form.password.value"
            @update:model-value="didUpdatePassword"
            :error="form.password.isInvalidInput"
            :error-message="form.password.errorMessage"
          >
            <template v-slot:prepend>
              <q-icon name="lock"> </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="visibility_off"> </q-icon>
            </template>
          </q-input>
        </div>
        <data class="column q-mt-sm">
          <q-btn
            class="button"
            color="indigo"
            @click="submit"
            :disable="!isSubmitEnabled()"
            >Login</q-btn
          >
        </data>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { validateEmail, validatePassword } from 'src/validation/LoginFormUtil';
import { ref } from 'vue';

const form = ref({
  email: {
    value: null,
    required: true,
  },
  password: {
    value: null,
    required: true,
  },
});

const didUpdateEmail = (newValue) => {
  const validationResult = validateEmail(newValue);
  form.value.email.isInvalidInput = validationResult.isInvalid;
  form.value.email.errorMessage = validationResult.errorMessage;
};

const didUpdatePassword = (newValue) => {
  const validationResult = validatePassword(newValue);
  form.value.password.isInvalidInput = validationResult.isInvalid;
  form.value.password.errorMessage = validationResult.errorMessage;
};

const isSubmitEnabled = () => {
  const emailResult = validateEmail(form.value.email.value);
  const passwordResult = validatePassword(form.value.password.value);
  return !emailResult.isInvalid && !passwordResult.isInvalid;
};

const submit = () => {
  if (!isSubmitEnabled()) {
    return;
  }

  console.log('Submit');
};
</script>

<style scoped>
.logo {
  width: 70%;
  margin-bottom: 10px;
}

.button {
  height: 50px;
}
</style>
