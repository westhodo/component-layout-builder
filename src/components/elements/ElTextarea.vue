<template>
  <Textarea
    v-model="value"
    placeholder="Please Enter."
    :invalid="props.invalid.value"
    :disabled="props.disabled.value"
    fluid
    auto-resize
    class="h-full!"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  invalid?: { type: string; value?: boolean }
  size?: { type: string; value?: 'small' | 'large' | 'normal' }
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
