<template>
  <div>
    <Password
      v-model="value"
      :invalid="props.invalid.value"
      :size="props.size.value === 'normal' ? undefined : props.size.value"
      :disabled="props.disabled.value"
      fluid
      toggle-mask
    />
  </div>
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
  size: () => ({
    type: 'select',
    value: 'normal',
    option: ['normal', 'small', 'large']
  }),
  disabled: () => ({
    type: 'select',
    value: false,
    option: [true, false]
  })
})
</script>
