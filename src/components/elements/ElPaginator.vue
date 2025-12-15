<template>
  <Paginator
    :rows="rows.value"
    :total-records="props.totalCount.value"
    :rows-per-page-options="[10, 20, 30]"
  />
</template>

<script setup lang="ts">
import Paginator from 'primevue/paginator'

interface Props {
  totalCount?: { type: string; value?: number }
  rows?: { type: string; value?: number }
}

const props = withDefaults(defineProps<Props>(), {
  totalCount: () => ({
    type: 'number',
    value: 50
  }),
  rows: () => ({
    type: 'number',
    value: 10
  })
})
</script>
