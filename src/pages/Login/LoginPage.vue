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
            v-model="form.email"
            @update:model-value="didUpdateEmail"
            :error="!form.isEmailValid"
            :error-message="form.emailError"
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
            v-model="form.password"
            @update:model-value="didUpdatePassword"
            :error="!form.isPasswordValid"
            :error-message="form.passwordError"
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

<style scoped>
.logo {
  width: 70%;
  max-width: 250px;
  margin-bottom: 20px;
}

.button {
  margin-top: 20px;
  height: 50px;
}
</style>

<script lang="ts" setup>
import {
  form,
  didUpdateEmail,
  didUpdatePassword,
  isSubmitEnabled,
  submit,
} from './LoginPageModel';
</script>
