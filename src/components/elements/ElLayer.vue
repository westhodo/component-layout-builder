<template>
  <div
    :style="{
      width: props.width.value + 'px',
      height: props.height.value + 'px'
    }"
    class="bg-white dark:bg-zinc-950"
  >
  </div>
</template>

<script setup lang="ts">
interface Props {
  width?: { type: string; value?: number }
  height?: { type: string; value?: number }
}

const props = withDefaults(defineProps<Props>(), {
  width: () => ({ type: 'input', value: 360 }),
  height: () => ({ type: 'input', value: 720 })
})
</script>
