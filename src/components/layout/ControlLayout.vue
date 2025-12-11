<template>
  <aside
    v-if="props.activeElement"
    class="h-screen overflow-x-hidden overflow-y-auto bg-white p-4 shadow-xl dark:bg-zinc-950 dark:text-white"
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
const emit = defineEmits(['update-prop'])

const updateProp = (key: string, value: unknown) => {
  emit('update-prop', { key, value })
}

const props = withDefaults(defineProps<Props>(), {
  activeElement: null
})
</script>
