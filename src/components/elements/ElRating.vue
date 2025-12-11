<template>
  <Rating
    v-model="value"
    :stars="props.count.value"
    :readonly="props.readonly.value"
    :disabled="props.disabled.value"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)

interface Props {
  count?: { type: string; value?: number }
  readonly?: { type: string; value?: boolean }
  disabled?: { type: string; value?: boolean }
}

const props = withDefaults(defineProps<Props>(), {
  count: () => ({
    type: 'select',
    value: 5,
    option: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }),
  readonly: () => ({
    type: 'select',
    value: false,
    option: [true, false]
  }),
  disabled: () => ({
    type: 'select',
    value: false,
    option: [true, false]
  })
})
</script>
