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
            :error="!pageModel.state.isEmailValid"
            :error-message="pageModel.state.emailError"
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
            :type="pageModel.state.hidePassword ? 'password' : 'text'"
            :error="!pageModel.state.isPasswordValid"
            :error-message="pageModel.state.passwordError"
          >
            <template v-slot:prepend>
              <q-icon name="lock"> </q-icon>
            </template>
            <template v-slot:append>
              <q-icon
                :name="
                  pageModel.state.hidePassword ? 'visibility_off' : 'visibility'
                "
                @click="pageModel.toggleHidePassword()"
              >
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="text-red text-center">{{ pageModel.state.loginError }}</div>
        <div class="column q-mt-sm">
          <q-btn
            class="button"
            color="indigo"
            @click="pageModel.submit"
            :loading="pageModel.state.isLoggingIn"
            :disable="!pageModel.state.canSubmit"
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
