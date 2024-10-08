<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { registerDependencies } from './DIContainer/DIContainer';

registerDependencies();

export default defineComponent({
  name: 'App',
});
</script>
