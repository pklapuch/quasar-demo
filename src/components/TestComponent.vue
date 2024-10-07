<template>
  <div class="flex flex-center">
    <div class="row full-width">{{ title }}</div>
    <div class="row full-width">{{ value }}</div>
    <div class="row full-width">{{ itemsCount }}</div>
    <div class="row full-width">{{ allItems }}</div>
    <q-btn @click="loadData" label="Load Data" />
  </div>
</template>

<script setup lang="ts">
/*
Imports
*/
import { ref } from 'vue';

/*
Data
*/

export interface Props {
  title: string;
  value?: string;
  items: () => Promise<string[]>;
}

/*
Definition
 */

const props = withDefaults(defineProps<Props>(), {
  items: async () => [],
});

const itemsCount = ref(0);
const allItems = ref('');

async function loadData() {
  const items = await props.items();
  itemsCount.value = items.length;
  allItems.value = items.join(', ');
}
</script>
