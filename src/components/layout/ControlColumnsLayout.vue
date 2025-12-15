<template>
  <Accordion
    value="0"
    class="bg-primary-50 dark:bg-primary-950"
    v-if="props.type === 'columns'"
  >
    <AccordionPanel value="0">
      <AccordionHeader>
        <div class="flex items-center gap-2">
          <div class="bg-primary flex h-3 w-3 items-center rounded-4xl"> </div>
          <p class="font-bold">{{ props.type }} option</p>
        </div>
      </AccordionHeader>
      <AccordionContent>
        <div class="mb-1 flex items-center gap-2 px-4 text-xs font-bold">
          <p class="w-[50%]">Label</p>
          <p class="w-[25%]">Width</p>
          <p class="w-[25%]">Sort</p>
        </div>

        <div
          v-for="(form, index) in props.data"
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
                @input="
                  (e) =>
                    updateDataProp(
                      index,
                      (e.target as HTMLInputElement).value,
                      'label'
                    )
                "
              />
              <InputText
                placeholder="Number"
                class="w-21.5"
                type="number"
                pattern="^\d+$"
                inputmode="numeric"
                size="small"
                :value="form.width"
                @input="
                  (e) =>
                    updateDataProp(
                      index,
                      (e.target as HTMLInputElement).value,
                      'width'
                    )
                "
              />
              <Checkbox
                :value="form.sort"
                @input="
                  (e: { target: HTMLInputElement }) =>
                    updateDataProp(
                      index,
                      (e.target as HTMLInputElement).value,
                      'sort'
                    )
                "
              />
            </div>
            <div class="flex items-center gap-1">
              <Button
                class="h-6! w-6!"
                :class="{
                  'pointer-events-none opacity-0': props.data.length === 1
                }"
                icon="pi pi-minus"
                outlined
                rounded
                size="small"
                severity="danger"
                @click="emit('remove-column', index)"
              />
              <Button
                icon="pi pi-plus"
                outlined
                rounded
                size="small"
                class="h-6! w-6!"
                @click="emit('add-column', index)"
              />
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<script setup lang="ts">
interface Column {
  label: string
  width: number
  sort: boolean
}
interface Props {
  type: string
  data: Column[]
}

const props = withDefaults(defineProps<Props>(), {
  type: '',
  data: () => []
})

const emit = defineEmits(['update-data-prop', 'add-column', 'remove-column'])

const updateDataProp = (index: number, value: unknown, column: string) => {
  emit('update-data-prop', index, value, column)
}
</script>
