<template>
  <nav class="border-primary-500 z-10 flex h-screen border-t-20">
    <ul
      class="h-full w-full overflow-x-hidden overflow-y-auto bg-white p-4 shadow-xl dark:bg-zinc-950"
    >
      <li
        v-for="(depth1, index) in component"
        :key="index"
        class="flex flex-wrap gap-2"
      >
        <p class="mt-3 w-full font-bold dark:text-white">{{ depth1.title }}</p>
        <div
          v-for="(depth2, index2) in depth1.children"
          :key="index2"
          class="flex w-full cursor-pointer items-center gap-2 rounded-2xl bg-gray-50 p-3 transition hover:bg-gray-100 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-900"
          @click="emit('select-menu', depth2)"
        >
          <AppIcon :icon="depth2.icon" width="14" height="14"></AppIcon>
          <p class="text-xs">{{ depth2.label }}</p>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { component } from '@/constants/layout'

const emit = defineEmits(['select-menu'])
</script>
