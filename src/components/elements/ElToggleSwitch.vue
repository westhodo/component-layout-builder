<template>
  <ToggleSwitch
    v-model="value"
    :invalid="props.invalid.value"
    :disabled="props.disabled.value"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  invalid?: { type: string; value?: boolean }
  disabled?: { type: string; value?: boolean }
}

const value = ref()

const props = withDefaults(defineProps<Props>(), {
  invalid: () => ({
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
