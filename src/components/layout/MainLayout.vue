<template>
  <LnbLayout @select-menu="handleMenuClick" />

  <div class="layout-wrapper h-full w-full">
    <div class="fixed z-10">
      <Button label="zoomin" @click="zoomIn"></Button>
      <Button label="zoomout" @click="zoomOut"></Button>
      <Button label="resetZoom" @click="resetZoom"></Button>
    </div>
    <div
      class="canvas h-full w-full"
      :style="{
        transform: `scale(${zoom})`,
        transformOrigin: 'top left'
      }"
    >
      <div class="h-full w-full">
        <Draggable
          v-for="node in components"
          :key="node.id"
          :x="node.x"
          :y="node.y"
          :w="node.w"
          :h="node.h"
          :active="node.active"
          :resizable="node.resizable"
          @activated="() => updateActive(node.id)"
          @update:x="(val: any) => updatePotision(node.id, { x: val })"
          @update:y="(val: any) => updatePotision(node.id, { y: val })"
        >
          <div class="h-full w-full">
            <component :is="node.component" v-bind="node.props" />
          </div>
        </Draggable>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { markRaw, ref, type Component } from 'vue'
import Draggable from 'draggable-resizable-vue3'

import ElButton from '@/components/elements/ElButton.vue'
import Checkbox from 'primevue/checkbox'
import ColorPicker from 'primevue/colorpicker'
import DatePicker from 'primevue/datepicker'
import InputOtp from 'primevue/inputotp'
import InputText from 'primevue/inputtext'

interface DragItem {
  id: string
  component: Component
  props: Record<string, unknown>
  x?: number
  y?: number
  w?: number
  h?: number
  active: boolean
  resizable?: boolean
}

const components = ref<DragItem[]>([])
const zoom = ref(1)

const zoomIn = () => (zoom.value += 0.1)
const zoomOut = () => (zoom.value = Math.max(0.1, zoom.value - 0.1))
const resetZoom = () => (zoom.value = 1)

const handleMenuClick = (menu: { label: string }) => {
  const actions: Record<string, () => void> = {
    Button: () => addItem(ElButton, { label: '1234' }),
    Checkbox: () => addItem(Checkbox, { binary: true }),
    ColorPicker: () => addItem(ColorPicker),
    DatePicker: () => addItem(DatePicker),
    InputOtp: () => addItem(InputOtp),
    InputText: () => addItem(InputText)
  }

  actions[menu.label]?.()
}

const addItem = (
  component: Component | string,
  props: Record<string, unknown> = {}
) => {
  components.value.push({
    id: crypto.randomUUID(),
    component: markRaw(component as Component),
    props,
    x: 500,
    y: 200,
    active: false,
    resizable: false
  })
}

const updateActive = (id: string) => {
  components.value.forEach((i) => {
    i.active = i.id === id
  })
}

const updatePotision = (id: string, patch: { x?: number; y?: number }) => {
  const idx = components.value.findIndex((i) => i.id === id)
  if (idx === -1) return

  components.value[idx] = {
    ...components.value[idx],
    ...patch
  } as (typeof components.value)[number]
}
</script>
