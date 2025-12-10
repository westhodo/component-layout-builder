<template>
  <ComponentPalette @select-menu="handleMenuClick" />

  <div class="h-screen w-full overflow-auto">
    <div
      class="h-full w-full"
      @wheel="onWheel"
      :style="{
        transform: `scale(${zoom})`,
        transformOrigin: 'top left'
      }"
    >
      <div
        ref="viewport"
        :style="{
          width: canvasWidth + 'px',
          height: canvasHeight + 'px'
        }"
      >
        <Draggable
          v-for="node in components"
          :key="node.id"
          :x="node.x"
          :y="node.y"
          :w="node.w"
          :h="node.h"
          :active="node.active"
          :resizable="node.resizable"
          @click="handleClick(node)"
          @activated="() => updateActive(node.id)"
          @update:x="(val: any) => updatePotision(node.id, { x: val })"
          @update:y="(val: any) => updatePotision(node.id, { y: val })"
          :grid="grid"
        >
          <div class="h-full w-full overflow-hidden">
            <component :is="node.component" v-bind="node.props" />
          </div>
        </Draggable>
      </div>
    </div>
  </div>

  <ControlLayout :activeElement="selectedItem" @update-prop="updateProp" />

  <AppToolbar @tool-select="handleZoom" />
</template>
<script setup lang="ts">
import { markRaw, reactive, ref, type Component } from 'vue'
import Draggable from 'draggable-resizable-vue3'
import { componentRegistry, type ComponentKey } from '../elements'

interface PropItem {
  type: string
  value: string | boolean
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

const components = ref<DragItem[]>([])
const zoom = ref(1)
const grid = ref([2, 2])
const canvasWidth = ref(5000)
const canvasHeight = ref(5000)
const selectedItem = ref<DragItem | null>(null)

const onWheel = (event: {
  ctrlKey: unknown
  preventDefault: () => void
  deltaY: number
}) => {
  if (!event.ctrlKey) return
  event.preventDefault()
  event.deltaY < 0 ? zoomIn() : zoomOut()
}

const zoomIn = () => (zoom.value += 0.1)
const zoomOut = () => (zoom.value = Math.max(0.1, zoom.value - 0.1))
const resetZoom = () => (zoom.value = 1)

const handleMenuClick = (menu: { label: ComponentKey }) => {
  const entry = componentRegistry[menu.label]
  const Comp = entry.component
  const props = entry.defaultProps()

  addItem(Comp, props)
}

const handleClick = (node: DragItem) => {
  selectedItem.value = node
}

const addItem = (
  component: Component | string,
  props: Record<string, PropItem> = {}
) => {
  components.value.push({
    id: crypto.randomUUID(),
    component: markRaw(component as Component),
    props: reactive(props),
    x: 500,
    y: 200,
    active: false
    // resizable: false
  })
}

const updateActive = (id: string) => {
  components.value.forEach((i) => {
    i.active = i.id === id
  })

  selectedItem.value = components.value.find((i) => i.active) ?? null
}

const updatePotision = (id: string, patch: { x?: number; y?: number }) => {
  const idx = components.value.findIndex((i) => i.id === id)
  if (idx === -1) return

  components.value[idx] = {
    ...components.value[idx],
    ...patch
  } as (typeof components.value)[number]
}

const updateProp = ({
  key,
  value
}: {
  key: string
  value: string | boolean
}) => {
  const activeNode = components.value.find(
    (v) => v.id === selectedItem.value?.id
  )
  if (activeNode) {
    const targetProp = activeNode.props[key]
    if (!targetProp) return
    targetProp.value = value
  }
}

const handleZoom = (target: string) => {
  const actions: Record<string, () => void> = {
    zoomin: () => zoomIn(),
    zoomout: () => zoomOut(),
    zoomreset: () => resetZoom()
  }

  actions[target]?.()
}
</script>
