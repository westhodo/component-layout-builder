<template>
  <aside class="fixed bottom-0 left-[50%] translate-[-50%] border">
    <ul class="inline-flex gap-1">
      <li v-for="(item, index) in template" :key="index" class="border">
        <ToggleSwitch v-model="mode" v-if="item.type === 'toggle'" />
        <i :class="item.icon"></i>
        <p>{{ item.label }}</p>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { toggleTheme } = useTheme()
// interface Props {
//   show: boolean;
// }

// const props = withDefaults(defineProps<Props>(), {
//   show: false,
// });

const mode = ref(false)

watch(mode, () => {
  toggleTheme()
})

const template = ref([
  {
    label: 'Mode',
    type: 'toggle'
  },
  {
    label: 'Button',
    icon: 'pi pi-cog',
    type: 'button'
  }
])
</script>
