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
            v-model="pageModel.email.value"
            :error="!pageModel.form.isEmailValid"
            :error-message="pageModel.form.emailError"
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
            v-model="pageModel.password.value"
            :type="pageModel.form.hidePassword ? 'password' : 'text'"
            :error="!pageModel.form.isPasswordValid"
            :error-message="pageModel.form.passwordError"
          >
            <template v-slot:prepend>
              <q-icon name="lock"> </q-icon>
            </template>
            <template v-slot:append>
              <q-icon
                :name="
                  pageModel.form.hidePassword ? 'visibility_off' : 'visibility'
                "
                @click="pageModel.toggleHidePassword()"
              >
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="text-red text-center">{{ pageModel.form.loginError }}</div>
        <div class="column q-mt-sm">
          <q-btn
            class="button"
            color="indigo"
            @click="pageModel.submit"
            :loading="pageModel.form.isLoggingIn"
            :disable="!pageModel.form.canSubmit"
            >Login</q-btn
          >
        </div>
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
import loginPageModel from './LoginPageModel';
const pageModel = loginPageModel();
</script>
