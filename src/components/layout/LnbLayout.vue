<template>
  <nav class="fixed m-2 h-screen w-[200px] border">
    <ul class="flex flex-wrap gap-1">
      <li
        v-for="(item, index) in template"
        :key="index"
        class="flex w-[calc(50%-2px)] flex-col items-center justify-center p-4"
      >
        <i :class="item.icon"></i>
        <p>{{ item.label }}</p>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// interface Props {
//   show: boolean;
// }

// const props = withDefaults(defineProps<Props>(), {
//   show: false,
// });

const template = ref([
  {
    label: 'Text',
    icon: 'pi pi-cog'
  },
  {
    label: 'Button',
    icon: 'pi pi-cog'
  },
  {
    label: 'Text',
    icon: 'pi pi-cog'
  },
  {
    label: 'Text',
    icon: 'pi pi-cog'
  },
  {
    label: 'Text',
    icon: 'pi pi-cog'
  }
])
</script>
