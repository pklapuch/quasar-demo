<template>
  <q-page class="flex flex-center text-white">
    <div>Not a real page</div>
  </q-page>
</template>

<style scoped>
.q-page {
  max-width: 750px;
  margin: 0 auto;
}
</style>

<script setup>
import { navigateToInitialScreen } from 'src/services/InitialRouteFlow';
navigateToInitialScreen();
</script>
