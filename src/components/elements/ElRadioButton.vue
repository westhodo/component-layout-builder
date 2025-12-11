<template>
  <div
    class="flex items-center gap-2"
    :class="{ 'flex-row-reverse': props.reverse.value }"
  >
    <RadioButton
      v-model="isActive"
      :inputId="'radio-' + props.label.value"
      :invalid="props.invalid.value"
      :size="props.size.value === 'normal' ? undefined : props.size.value"
      :disabled="props.disabled.value"
      binary
    />
    <label
      v-if="props.label.value"
      :for="'radio-' + props.label.value"
      :class="`${props.size.value === 'small' ? 'text-xs' : props.size.value === 'large' ? 'text-md' : 'text-sm'}`"
    >
      {{ props.label.value }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isActive = ref(false)

interface Props {
  label?: { type: string; value?: string }
  id?: { type: string; value?: string }
  size?: { type: string; value?: 'small' | 'large' | 'normal' }
  disabled?: { type: string; value?: boolean }
  invalid?: { type: string; value?: boolean }
  reverse?: { type: string; value?: boolean }
}

const props = withDefaults(defineProps<Props>(), {
  label: () => ({ type: 'input', value: '' }),
  size: () => ({
    type: 'select',
    value: 'normal',
    option: ['normal', 'small', 'large']
  }),
  disabled: () => ({
    type: 'select',
    value: false,
    option: [true, false]
  }),
  invalid: () => ({
    type: 'select',
    value: false,
    option: [true, false]
  }),
  reverse: () => ({
    type: 'select',
    value: false,
    option: [true, false]
  })
})
</script>
