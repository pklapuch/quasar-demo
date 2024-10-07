<template>
  <q-page
    v-touch-pan.vertical.prevent.mouse="handlePan"
    class="flex flex-center text-white"
  >
    <div class="row">
      <q-input
        input-class="text-center text-h5 text-white"
        v-model="data.name"
        color="teal"
        filled
        placeholder="Counter"
      />
    </div>
    <div class="row full-width">
      <div class="col text-center items-center">
        <q-btn
          v-touch-repeat:300:300:300:300:50.mouse="decreaseCounter"
          @click="decreaseCounter"
          round
          size="xl"
          icon="remove"
          :disable="data.counter <= 0"
        />
      </div>
      <div class="col text-center text-h2">
        {{ data.counter }}
      </div>
      <div class="col text-center">
        <q-btn
          v-touch-repeat:300:300:300:300:50.mouse="increaseCounter"
          @click="increaseCounter"
          round
          size="xl"
          icon="add"
        />
      </div>
    </div>
    <div class="row">
      <q-btn @click="resetCounter" round size="xl" icon="restart_alt" />
    </div>
  </q-page>
</template>

<style scoped>
.q-page {
  max-width: 750px;
  margin: 0 auto;
}
</style>

<script setup>
/*
Imports
*/

import { watch } from 'vue';
import { useQuasar } from 'quasar';
import {
  data,
  increaseCounter,
  decreaseCounter,
  resetCounter,
  handlePan,
} from './Counter';

/*
quasar
*/

const $q = useQuasar();

try {
  const savedData = $q.localStorage.getItem('data');
  console.log(savedData);

  if (savedData) Object.assign(data, savedData);
} catch (e) {
  console.log(e);
}

watch(data, (value) => {
  $q.localStorage.set('data', value);
});
</script>
