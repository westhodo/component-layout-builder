<template>
  <div
    class="grid grid-rows-1"
    :class="[
      { 'grid-cols-[240px_1fr_300px]': currentActive },
      { 'grid-cols-[240px_1fr]': !currentActive }
    ]"
  >
    <MainLayout ref="mainLayout" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const mainLayout = ref()
const currentActive = computed(() => mainLayout.value?.currentActive)
</script>
