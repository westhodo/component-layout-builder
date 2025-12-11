<template>
  <Button
    class="w-full"
    :label="props.label.value"
    :severity="props.severity.value"
    :disabled="props.disabled.value"
    :raised="props.raised.value"
    :rounded="props.rounded.value"
    :text="props.text.value"
    :outlined="props.outlined.value"
    :badge="props.badge.value"
    :size="props.size.value === 'normal' ? undefined : props.size.value"
  />
</template>

<script setup lang="ts">
interface Props {
  label?: { type: string; value?: string }
  severity?: { type: string; value?: string }
  badge?: { type: string; value?: string }
  size?: { type: string; value?: 'small' | 'large' | 'normal' }
  disabled?: { type: string; value?: boolean }
  raised?: { type: string; value?: boolean }
  rounded?: { type: string; value?: boolean }
  text?: { type: string; value?: boolean }
  outlined?: { type: string; value?: boolean }
}

const props = withDefaults(defineProps<Props>(), {
  label: () => ({ type: 'input', value: '' }),
  severity: () => ({
    type: 'select',
    value: 'Primary',
    option: [
      'Primary',
      'secondary',
      'success',
      'info',
      'warn',
      'help',
      'danger',
      'contrast'
    ]
  }),
  badge: () => ({ type: 'input', value: '' }),
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
  raised: () => ({
    type: 'select',
    value: false,
    option: [true, false]
  }),
  rounded: () => ({
    type: 'select',
    value: false,
    option: [true, false]
  }),
  text: () => ({
    type: 'select',
    value: false,
    option: [true, false]
  }),
  outlined: () => ({
    type: 'select',
    value: false,
    option: [true, false]
  })
})
</script>
