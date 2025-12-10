<template>
  <div class="flex items-center gap-2">
    <Checkbox
      :inputId="'checkbox-' + props.label.value"
      :invalid="props.invalid.value"
      :size="props.size.value"
      :disabled="props.disabled.value"
      v-model="isActive"
    />
    <label
      v-if="props.label.value"
      :for="'checkbox-' + props.label.value"
      :class="`${props.size.value === 'small' ? 'text-xs' : props.size.value === 'large' ? 'text-md' : 'text-sm'}`"
    >
      {{ props.label.value }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  label?: { type: string; value?: string }
  id?: { type: string; value?: string }
  size?: { type: string; value?: 'small' | 'large' }
  disabled?: { type: string; value?: boolean }
  invalid?: { type: string; value?: boolean }
}

const props = withDefaults(defineProps<Props>(), {
  label: () => ({ type: 'input', value: '' }),
  size: () => ({
    type: 'select',
    value: 'small',
    option: ['small', 'large']
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
  })
})

const isActive = ref(true)
</script>
