<template>
  <aside
    v-if="props.activeElement"
    class="border-primary-500 h-screen overflow-x-hidden overflow-y-auto border-t-20 bg-white p-4 shadow-xl dark:bg-zinc-950 dark:text-white"
  >
    <div>
      <h2 class="mb-4 text-xl font-bold">
        {{
          (props.activeElement?.component as any)?.__name.replaceAll('El', '')
        }}
      </h2>
      <div
        v-for="(val, key) in props.activeElement.props"
        :key="key"
        class="mb-3"
      >
        <p class="mb-1 font-bold">
          {{ key.charAt(0).toUpperCase() + key.slice(1) }}
        </p>
        <InputText
          v-if="val.type === 'input'"
          placeholder="Please enter a text."
          class="w-full"
          type="text"
          size="small"
          :value="val.value"
          @input="(e) => updateProp(key, (e.target as HTMLInputElement).value)"
        />
        <InputText
          v-if="val.type === 'number'"
          placeholder="Please enter a number."
          class="w-full"
          type="number"
          pattern="^\d+$"
          inputmode="numeric"
          size="small"
          :value="val.value"
          @input="(e) => updateProp(key, (e.target as HTMLInputElement).value)"
        />
        <Select
          v-if="val.type === 'select'"
          class="w-full text-sm"
          size="small"
          v-model="val.value"
          :options="val.option"
        >
        </Select>

        <Accordion
          value="0"
          class="bg-primary-50 dark:bg-primary-950"
          v-if="key === 'columns'"
        >
          <AccordionPanel value="0">
            <AccordionHeader>
              <div class="flex items-center gap-2">
                <div class="bg-primary flex h-3 w-3 items-center rounded-4xl">
                </div>
                <p class="font-bold">{{ key }} option</p>
              </div>
            </AccordionHeader>
            <AccordionContent>
              <div class="mb-1 flex items-center gap-2 px-4 text-xs font-bold">
                <p class="w-[50%]">Label</p>
                <p class="w-[25%]">Width</p>
                <p class="w-[25%]">Sort</p>
              </div>

              <div
                v-for="(form, index) in val"
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
                        (e) =>
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
                        'pointer-events-none opacity-0': val.length === 1
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
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

interface PropItem {
  type: string
  value: string | boolean
  option: unknown[]
}

interface DragItem {
  id: string
  component: Component
  props: Record<string, PropItem>
  x?: number
  y?: number
  w?: number
  h?: number
  active: boolean
  resizable?: boolean
}
interface Props {
  activeElement: DragItem | null
}

const props = withDefaults(defineProps<Props>(), {
  activeElement: null
})

const emit = defineEmits([
  'update-prop',
  'update-data-prop',
  'add-column',
  'remove-column'
])

const updateProp = (key: string, value: unknown) => {
  emit('update-prop', { key, value })
}

const updateDataProp = (index: number, value: unknown, column: string) => {
  emit('update-data-prop', index, value, column)
}
</script>
