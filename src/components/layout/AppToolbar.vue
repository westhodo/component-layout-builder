<template>
  <aside
    class="fixed bottom-0 left-[50%] translate-[-50%] rounded-2xl border border-gray-100 shadow"
  >
    <ul class="inline-flex gap-2 p-2 px-4">
      <li
        v-for="(tool, index) in template"
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
          class="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg transition hover:bg-gray-100"
        >
          <i :class="tool.icon"></i>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
// interface Props {
//   show: boolean;
// }

// const props = withDefaults(defineProps<Props>(), {
//   show: false,
// });

const isMode = ref(false)

onMounted(() => {
  isMode.value = theme.value !== 'light'
})

const template = ref([
  {
    type: 'toggle',
    event: 'mode',
    icon: ''
  }
])
</script>
<style src="../../assets/scss/customSwitch.scss"></style>
