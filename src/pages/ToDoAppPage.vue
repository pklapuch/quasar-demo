<template>
  <q-page class="flex flex-center">
    <q-card class="my-card" style="width: 400px">
      <q-card-section>
        <div class="text-h6">{{ cardTitle }}</div>
      </q-card-section>

      <q-card-section>
        <div>
          <q-input v-model="todoTask" label="New task">
            <template v-slot>
              <q-btn round dense flat icon="send" @click="addItem" />
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section v-if="todoItems.length > 0">
        <div
          class="row justify-center"
          v-for="(item, index) in todoItems"
          :key="index"
        >
          <div class="col-8 q-py-md">
            {{ item.title }}
          </div>
          <div class="col-auto q-py-md">
            <q-btn round dense flat icon="done" @click="deleteItem(index)" />
          </div>
        </div>
      </q-card-section>

      <q-card-section v-if="todoItems.length == 0">
        Nothing to do!
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
/*
Import
*/
import { ref } from 'vue';

/*
Data
*/
const cardTitle = 'First Card';
const todoTask = ref('');
const todoItems = ref([
  {
    title: 'Item 1',
  },
  {
    title: 'Item 2',
  },
]);

/*
Methods
*/

function addItem() {
  todoItems.value.push({
    title: todoTask,
  });
}

function deleteItem(index) {
  todoItems.value.splice(index, 1);
}
</script>
