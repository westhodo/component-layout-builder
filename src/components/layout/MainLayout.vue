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
        @click.self="handleClear"
      >
        <Draggable
          :class="{ 'view-mode': !isEdit }"
          v-for="(node, index) in components"
          :key="node.id"
          :x="node.x"
          :y="node.y"
          :w="node.w"
          :h="node.h"
          :active="node.active"
          :resizable="node.resizable"
          @click="handleClick(node)"
          @keyup.esc="handleDel(index)"
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

  <AppToolbar @tool-select="handleTool" :template="template" />
</template>
<script setup lang="ts">
import { computed, markRaw, reactive, ref, watch, type Component } from 'vue'
import Draggable from 'draggable-resizable-vue3'
import { componentRegistry, type ComponentKey } from '../elements'

interface PropItem {
  type: string
  value: string | boolean | number
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
const isEdit = ref(true)
const currentActive = ref(false)

const template = reactive([
  {
    type: 'button',
    event: 'view',
    icon: computed(() =>
      !isEdit.value ? 'ic:twotone-mode-edit' : 'ic:twotone-edit-off'
    )
  },
  {
    type: 'button',
    event: 'zoomin',
    icon: 'solar:magnifer-zoom-in-linear'
  },
  {
    type: 'button',
    event: 'zoomout',
    icon: 'solar:magnifer-zoom-out-linear'
  },
  {
    type: 'button',
    event: 'zoomreset',
    icon: 'solar:refresh-bold'
  },
  {
    type: 'toggle',
    event: 'mode'
  }
])

watch(isEdit, (val) => {
  components.value.forEach((item) => (item.resizable = val))
})

watch(
  selectedItem,
  (val) => {
    if (!val) return
    currentActive.value = val?.active
  },
  { deep: true }
)

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
  selectedItem.value.active = true
}

const handleClear = () => {
  if (!selectedItem.value) return
  selectedItem.value.active = false
}

const addItem = (
  component: Component | string,
  props: Record<string, PropItem> = {}
) => {
  components.value.push({
    id: Math.random().toString(36).slice(2),
    component: markRaw(component as Component),
    props: reactive(props),
    x: 500,
    y: 200,
    active: false,
    resizable: isEdit.value
  })
}

const handleDel = (index: number) => {
  components.value.splice(index, 1)
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

const handleTool = (target: string) => {
  const actions: Record<string, () => void> = {
    zoomin: () => zoomIn(),
    zoomout: () => zoomOut(),
    zoomreset: () => resetZoom(),
    view: () => (isEdit.value = !isEdit.value)
  }

  actions[target]?.()
}
defineExpose({ currentActive })
</script>

<style lang="scss" scoped>
.view-mode {
  border: none;
}
</style>
