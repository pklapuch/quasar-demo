<template>
  <div>{{ title }}</div>
  <q-btn @click="doSomething" label="Do something" />
  <q-btn to="test" label="Go to Test Page" />
  <q-input v-model="nameField" label="Standard" />

  <p v-show="isLoading">
    <q-circular-progress
      indeterminate
      rounded
      size="50px"
      color="lime"
      class="q-ma-md"
    />
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'HelloWorldComponent',
  props: {},

  setup() {
    const $q = useQuasar();
    const data = ref(null);

    const isLoading = ref(false);
    const title = ref('Hello World REF');
    const nameField = ref('Unknown');

    function doSomething() {
      isLoading.value = true;

      api
        .get('https://api.breakingbadquotes.xyz/v1/quotes')
        .then((response) => {
          data.value = response.data;
          title.value = 'Response: ' + response.data[0].quote;
          isLoading.value = false;
        })
        .catch(() => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem',
          });
          isLoading.value = false;
        });
    }

    return {
      title: title,
      nameField: nameField,
      isLoading: isLoading,
      doSomething,
    };
  },
});
</script>
