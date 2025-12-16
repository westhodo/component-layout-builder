<template>
  <div class="h-full">
    <div class="absolute top-[3px] -right-10 z-10">
      <Button icon="pi pi-plus" size="small" @click="toggle"></Button>
    </div>
    <div class="absolute -bottom-10 left-0 z-10">
      <Button icon="pi pi-plus" size="small" @click="toggle"></Button>
    </div>
    <div @mouseenter="isEnter = true" @mouseleave="isEnter = false">
      <PrimeDataTable
        ref="dataTableRef"
        :value="props.value"
        :data-key="props.columns[0]?.key"
        :loading="props.loading.value"
        column-resize-mode="fit"
        :selection-mode="props.selectedMode.value"
        :selection="selectedItem"
      >
        <template #empty>
          <p
            v-if="!props.loading"
            class="flex flex-col items-center justify-center px-5 text-sm"
          >
            {{ props.emptyText.value }}
          </p>
        </template>
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
              <div
                :style="{ width: col.width ? col.width - 32 + 'px' : 'auto' }"
                class="truncate"
              >
                <span class="text-sm whitespace-pre">
                  {{ getRowData(data, [col.key]) || '-' }}
                </span>
              </div>
            </slot>
          </template>
        </PrimeColumn>
      </PrimeDataTable>
      <Popover ref="op">
        <div class="mb-1 flex items-center gap-2 px-4 text-xs font-bold">
          <p class="w-[50%]">Label</p>
          <p class="w-[25%]">Width</p>
          <p class="w-[25%]">Sort</p>
        </div>

        <div
          v-for="(form, index) in props.columns"
          :key="index"
          class="border-primary ml-[4.5px] border-l-2 pt-1 pb-1"
        >
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <InputText
                placeholder="Please enter a text."
                class="ml-2 w-full"
                type="text"
                size="small"
                :value="form.label"
              />
              <InputText
                placeholder="Number"
                class="w-21.5"
                type="number"
                pattern="^\d+$"
                inputmode="numeric"
                size="small"
                :value="form.width"
              />
              <Checkbox :binary="true" :modelValue="form.sort" />
            </div>
            <div class="flex items-center gap-1">
              <Button
                class="h-6! w-6!"
                icon="pi pi-minus"
                outlined
                rounded
                size="small"
                severity="danger"
              />
              <Button
                icon="pi pi-plus"
                outlined
                rounded
                size="small"
                class="h-6! w-6!"
              />
            </div>
          </div>
        </div>
      </Popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import PrimeDataTable from 'primevue/datatable'
import PrimeColumn from 'primevue/column'
import { ref } from 'vue'

export interface Column {
  sort?: boolean | undefined
  key: string
  label: string
  width?: number
}

interface Props {
  value: unknown[]
  columns?: Column[]
  loading?: { type: string; value?: boolean }
  useCheckbox?: { type: string; value?: boolean }
  selectedMode?: { type: string; value?: 'single' | 'multiple' }
  emptyText: { type: string; value?: string }
}

const selectedItem = ref([])
const op = ref()
const isEnter = ref(false)
const props = withDefaults(defineProps<Props>(), {
  value: () => [],
  columns: () => [],
  loading: () => ({
    type: 'select',
    value: false,
    option: [true, false]
  }),
  useCheckbox: () => ({
    type: 'select',
    value: false,
    option: [true, false]
  }),
  emptyText: () => ({
    type: 'inpute',
    value: '등록된 데이터가 없습니다.'
  }),
  selectedMode: () => ({
    type: 'select',
    value: 'multiple',
    option: ['multiple', 'single']
  })
})

const getRowData = (
  object: Record<string, unknown>,
  path: string | (string | number)[],
  defaultValue?: unknown
): unknown => {
  if (!object) return defaultValue

  const keys = typeof path === 'string' ? path.split('.') : path
  return keys.reduce<unknown>((acc, key) => {
    if (
      acc !== undefined &&
      acc !== null &&
      typeof acc === 'object' &&
      key in acc
    ) {
      return (acc as Record<string | number, unknown>)[key]
    }
    return defaultValue
  }, object)
}

const toggle = (event) => {
  op.value.toggle(event)
}
</script>
