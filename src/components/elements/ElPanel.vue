<template>
  <Panel :header="props.header.value" toggleable>
    <pre class="text-sm">{{ props.text.value }}</pre>
  </Panel>
</template>

<script setup lang="ts">
interface Props {
  header?: { type: string; value?: string }
  text?: { type: string; value?: string }
}

const props = withDefaults(defineProps<Props>(), {
  header: () => ({ type: 'input', value: '' }),
  text: () => ({ type: 'textarea', value: '' })
})
</script>
