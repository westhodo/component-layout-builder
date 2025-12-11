<template>
  <aside
    class="fixed bottom-0 left-[50%] translate-[-50%] rounded-2xl border border-gray-100 bg-white shadow dark:border-zinc-900 dark:bg-zinc-950"
  >
    <ul class="inline-flex gap-2 p-2">
      <li
        v-for="(tool, index) in props.template"
        :key="index"
        class="flex items-center"
      >
        <div class="custom-switch" v-if="tool.type === 'toggle'">
          <input
            id="switch"
            v-model="isMode"
            type="checkbox"
            @input="toggleTheme()"
          />
          <label for="switch"> </label>
          <div class="bg"></div>
          <div class="icon_wrap">
            <div><i class="pi pi-sun"></i></div>
            <div><i class="pi pi-moon"></i></div>
          </div>
        </div>
        <div
          v-else
          class="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg transition hover:bg-gray-100 dark:hover:bg-zinc-800"
          @click="emit('tool-select', tool.event)"
        >
          <AppIcon :icon="tool.icon" width="16" height="16"></AppIcon>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
const emit = defineEmits(['tool-select'])
const isMode = ref(false)

interface Props {
  template: {
    type: string
    event: string
    icon: string
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  template: () => []
})

onMounted(() => {
  isMode.value = theme.value !== 'light'
})
</script>

<style src="../../assets/scss/customSwitch.scss"></style>
