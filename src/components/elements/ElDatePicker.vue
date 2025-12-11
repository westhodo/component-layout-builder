<template>
  <DatePicker
    v-model="value"
    :placeholder="props.format.value"
    :date-format="props.format.value"
    :show-icon="props.useIcon.value"
    :show-time="props.useTime.value"
    :selection-mode="props.mode.value"
    :show-button-bar="props.useButton.value"
    :view="props.view.value === 'day' ? undefined : props.view.value"
    :size="props.size.value === 'normal' ? undefined : props.size.value"
    :disabled="props.disabled.value"
    fluid
    icon-display="input"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  useIcon?: { type: string; value?: boolean }
  useTime?: { type: string; value?: boolean }
  useButton?: { type: string; value?: boolean }
  mode?: { type: string; value?: string }
  view?: { type: string; value?: string }
  format?: { type: string; value?: string }
  size?: { type: string; value?: 'small' | 'large' | 'normal' }
  disabled?: { type: string; value?: boolean }
}

const value = ref()

const props = withDefaults(defineProps<Props>(), {
  useIcon: () => ({
    type: 'select',
    value: true,
    option: [true, false]
  }),
  useTime: () => ({
    type: 'select',
    value: false,
    option: [true, false]
  }),
  useButton: () => ({
    type: 'select',
    value: false,
    option: [true, false]
  }),
  format: () => ({
    type: 'select',
    value: 'yy.mm.dd',
    option: [
      'yy.mm.dd',
      'yy-mm-dd',
      'yy/MM/dd',
      'yyyy.MM.dd',
      'yyyy-MM-dd',
      'yyyy/MM/dd',
      'MM/dd/yyyy',
      'MM-dd-yyyy',
      'M/d/yyyy',
      'MMM dd, yyyy',
      'MMMM dd, yyyy',
      'yyyyMMdd',
      'yyyy-MM-dd HH:mm',
      'yyyy.MM.dd HH:mm',
      'yyyy/MM/dd HH:mm',
      'yyyy-MM-dd HH:mm:ss',
      'yyyy-MM-dd hh:mm a'
    ]
  }),
  mode: () => ({
    type: 'select',
    value: 'single',
    option: ['single', 'range']
  }),
  view: () => ({
    type: 'select',
    value: 'day',
    option: ['day', 'month', 'year']
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
