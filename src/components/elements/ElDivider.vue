<template>
  <Divider
    :type="props.type.value"
    :layout="props.layout.value === 'none' ? undefined : props.layout.value"
    :align="props.align.value"
  >
    <b class="text-xs">{{ props.text.value }}</b>
  </Divider>
</template>

<script setup lang="ts">
interface Props {
  type?: { type: string; value?: string }
  layout?: { type: string; value?: string }
  text?: { type: string; value?: string }
  align?: { type: string; value?: string }
}

const props = withDefaults(defineProps<Props>(), {
  type: () => ({
    type: 'select',
    value: 'solid',
    option: ['solid', 'dotted', 'dashed']
  }),
  layout: () => ({
    type: 'select',
    value: 'none',
    option: ['none', 'vertical']
  }),
  text: () => ({
    type: 'input',
    value: ''
  }),
  align: () => ({
    type: 'select',
    value: 'left',
    option: ['left', 'center', 'right']
  })
})
</script>
