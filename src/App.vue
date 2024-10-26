<template>
  <router-view />
</template>

<script lang="ts">
import { registerDependencies } from './DIContainer/DIContainer';
import { getAppRouter } from './router';

export default {
  name: 'App',
  setup() {
    const router = getAppRouter();

    /// IMPORTANT: `Provide` can only be used within `setup` block!
    registerDependencies(router);

    return { router };
  },
};
</script>
