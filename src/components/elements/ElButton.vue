<template>
  <Button
    :label="props.label"
    :severity="props.severity"
    :disabled="props.disabled"
    :raised="props.raised"
    :rounded="props.rounded"
    :text="props.text"
    :outlined="props.outlined"
    :badge="props.badge"
    :size="props.size"
  ></Button>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  severity?: string
  badge?: string
  size?: string
  disabled?: boolean
  raised?: boolean
  rounded?: boolean
  text?: boolean
  outlined?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  severity: 'Primary',
  badge: '',
  size: 'small',
  disabled: false,
  raised: false,
  rounded: false,
  text: false,
  outlined: false
})
</script>
