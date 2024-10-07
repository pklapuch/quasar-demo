<template>
  <q-page>
    <div class="row">Hello World: Test component</div>
    <div class="row">
      <TestComponent
        title="Parent Title"
        value="Parent Value"
        :items="loadData"
      />
    </div>
  </q-page>
</template>

<script setup>
/*
Imports
*/
import TestComponent from 'components/TestComponent.vue';

async function loadData() {
  return ['One', 'Two', 'Three'];
}

/*
Definition
*/
</script>
