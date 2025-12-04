<template>
  <main class="w-full border p-8" @click="(e) => emit('show-lnb', e)">
    <ul ref="el">
      <li v-for="item in list" :key="item.id" class="border">
        <p class="m-2">{{ item.name }}</p>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDraggable } from 'vue-draggable-plus';

const emit = defineEmits(['show-lnb']);

const el = ref();
const list = ref([
  {
    name: 'Joao',
    id: 1,
  },
  {
    name: 'Jean',
    id: 2,
  },
  {
    name: 'Johanna',
    id: 3,
  },
  {
    name: 'Juan',
    id: 4,
  },
]);

useDraggable(el, list, {
  animation: 150,
  onStart() {
    console.log('start');
  },
  onUpdate() {
    console.log('update');
  },
});
</script>
