<template>
  <div class="h-full">
    <div @mouseenter="isEnter = true" @mouseleave="isEnter = false">
      <PrimeDataTable
        ref="dataTableRef"
        :value="tableData"
        :data-key="props.columns[0]?.key"
        :loading="props.loading.value"
        column-resize-mode="fit"
        selection-mode="multiple"
        :selection="selectedItem"
      >
        <PrimeColumn
          v-if="props.useCheckbox.value"
          selection-mode="multiple"
          header-style="width: 48px"
        >
        </PrimeColumn>
        <PrimeColumn
          v-for="col in columns"
          :key="col.key"
          :header="col.label"
          :style="{
            width: col.width ? col.width - 32 + 'px' : 'auto'
          }"
          :header-style="{ 'white-space': 'nowrap', 'font-size': '14px' }"
          :field="col.key"
          :sortable="col.sort"
        >
          <template #body="{ data, index, ...body }">
            <slot
              :name="col.key"
              :row="data"
              :index="index"
              :body="{ ...body, index }"
            >
              <Skeleton />
            </slot>
          </template>
        </PrimeColumn>
      </PrimeDataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import PrimeDataTable from 'primevue/datatable'
import PrimeColumn from 'primevue/column'
import { computed, ref } from 'vue'

export interface Column {
  sort?: boolean | undefined
  key: string
  label: string
  width?: number
}

interface Props {
  columns?: Column[]
  rows?: { type: string; value?: number }
  loading?: { type: string; value?: boolean }
  useCheckbox?: { type: string; value?: boolean }
  selectedMode?: { type: string; value?: 'single' | 'multiple' }
}

const selectedItem = ref([])
const isEnter = ref(false)
const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  rows: () => ({
    type: 'number',
    value: 6
  }),
  loading: () => ({
    type: 'select',
    value: false,
    option: [true, false]
  }),
  useCheckbox: () => ({
    type: 'select',
    value: false,
    option: [true, false]
  })
})

const tableData = computed(() =>
  Array.from({ length: props.rows.value || 0 }, () => ({}))
)
</script>
