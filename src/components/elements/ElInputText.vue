<template>
  <div>
    <InputText
      v-model="value"
      placeholder="Please Enter."
      :invalid="props.invalid.value"
      :size="props.size.value === 'normal' ? undefined : props.size.value"
      :disabled="props.disabled.value"
      fluid
    />
    <Message
      size="small"
      :severity="props.helpTextColor.value"
      variant="simple"
      v-if="props.helpText.value"
    >
      {{ props.helpText.value }}
    </Message>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  invalid?: { type: string; value?: boolean }
  helpText?: { type: string; value?: string }
  helpTextColor?: { type: string; value?: string }
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
  helpText: () => ({
    type: 'input',
    value: ''
  }),
  helpTextColor: () => ({
    type: 'select',
    value: 'error',
    option: ['secondary', 'success', 'info', 'warn', 'error', 'contrast']
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
