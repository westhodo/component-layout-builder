<template>
  <InputOtp
    v-model="value"
    :mask="props.mode.value === 'password'"
    :integer-only="props.input.value === 'number'"
    :size="props.size.value === 'normal' ? undefined : props.size.value"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  mode?: { type: string; value?: string }
  input?: { type: string; value?: string }
  size?: { type: string; value?: 'small' | 'large' | 'normal' }
}

const value = ref()

const props = withDefaults(defineProps<Props>(), {
  mode: () => ({
    type: 'select',
    value: 'none',
    option: ['none', 'password']
  }),
  input: () => ({
    type: 'select',
    value: 'all',
    option: ['all', 'number']
  }),
  size: () => ({
    type: 'select',
    value: 'normal',
    option: ['normal', 'small', 'large']
  })
})
</script>
