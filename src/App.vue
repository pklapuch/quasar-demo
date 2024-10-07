<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  registerDependencies,
  registerMockDependencies,
} from './DIContainer/DIContainer';

registerDependencies();
registerMockDependencies();

export default defineComponent({
  name: 'App',
});
</script>
