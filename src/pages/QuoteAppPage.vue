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
import { useQuasar } from 'quasar';
import { loadQuoteService } from 'src/DIContainer/QuoteAppContainer';
/*
quasar
*/
const $q = useQuasar();

/*
data
*/
const isLoading = ref(false);
const title = ref('Quote of the day');
const quoteOfTheDay = ref('');

async function loadData() {
  isLoading.value = true;

  try {
    const quote = await loadQuoteService();
    quoteOfTheDay.value = 'QUOTE: ' + quote;
    isLoading.value = false;
  } catch (error) {
    $q.notify({
      color: 'negative',
      position: 'top',
      message: 'Loading failed',
      icon: 'report_problem',
    });

    isLoading.value = false;
    quoteOfTheDay.value = error;
  }
}
</script>
