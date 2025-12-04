<template>
  <div class="flex gap-2">
    <LnbLayout :show="isShow" />
    <MainLayout @show-lnb="handleLnb" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isShow = ref(false)
const handleLnb = () => {
  isShow.value = !isShow.value
}
</script>
