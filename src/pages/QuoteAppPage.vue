<template>
  <q-page class="items-center text-white">
    <div class="row flex flex-center">{{ title }}</div>
    <div class="row flex flex-center">
      <q-btn @click="loadData" label="Do something" />
    </div>
    <div class="row flex flex-center">{{ quoteOfTheDay }}</div>

    <p v-show="isLoading">
      <q-circular-progress
        indeterminate
        rounded
        size="50px"
        color="lime"
        class="q-ma-md"
      />
    </p>
  </q-page>
</template>

<script setup>
/*
Imports
*/
import { ref } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

/*
quasar
*/

const $q = useQuasar();

/*
data
*/
const remoteData = ref(null);
const isLoading = ref(false);
const title = ref('Quote of the day');
const quoteOfTheDay = ref('');

function loadData() {
  isLoading.value = true;

  api
    .get('https://api.breakingbadquotes.xyz/v1/quotes')
    .then((response) => {
      remoteData.value = response.data;
      quoteOfTheDay.value = 'QUOTE: ' + response.data[0].quote;
      isLoading.value = false;
    })
    .catch(() => {
      $q.notify({
        color: 'negative',
        position: 'top',
        message: 'Loading failed',
        icon: 'report_problem',
      });

      quoteOfTheDay.value = 'ERROR!';
      isLoading.value = false;
    });
}
</script>
