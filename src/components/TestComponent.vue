<template>
  <div class="row">{{ title }}</div>
  <div class="row">{{ value }}</div>
</template>

<script lang="ts">
/*
Imports
*/
import { defineComponent } from 'vue';

/*
Data
*/

export interface TestProps {
  title: string;
  value?: string;
}

/*
Definition
 */

export default defineComponent({
  name: 'TestComponent',
  props: {
    title: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      default: '',
    },
  },
});
</script>
