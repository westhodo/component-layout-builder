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

  <ControlLayout
    :activeElement="selectedItem"
    @update-prop="updateSingleProp"
    @updateDataProp="updateDataProp"
    @add-column="addColumns"
    @remove-column="removeColumns"
  />

  <AppToolbar @tool-select="handleTool" :template="template" />

  <Popover ref="colorPaletteRef" class="dark:bg-zinc-950!">
    <p class="pb-2 text-sm font-bold">Primary color</p>
    <ul class="flex max-w-[280px] flex-wrap items-center gap-1">
      <li
        v-for="(color, index) in colorPalette"
        :key="index"
        class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-4xl border-2 border-transparent transition"
        @click="(setGlobalPrimaryColor(color), (selectedColor = index))"
        :style="
          selectedColor === index
            ? `border-color:${color};`
            : `border-color: transparent`
        "
      >
        <div
          class="h-4.5 w-4.5 rounded-4xl"
          :style="`background-color : ${color};`"
        >
        </div>
      </li>
    </ul>
  </Popover>
</template>
<script setup lang="ts">
import { computed, markRaw, reactive, ref, watch, type Component } from 'vue'
import Draggable from 'draggable-resizable-vue3'
import { componentRegistry, type ComponentKey } from '../elements'
import { colorPalette } from '@/constants/layout'

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
const selectedColor = ref(0)
const grid = ref([2, 2])
const canvasWidth = ref(5000)
const canvasHeight = ref(5000)
const selectedItem = ref<DragItem | null>(null)
const isEdit = ref(true)
const currentActive = ref(false)
const colorPaletteRef = ref()

const template = reactive([
  {
    type: 'button',
    event: 'view',
    icon: computed(() =>
      !isEdit.value ? 'ic:twotone-mode-edit' : 'ic:twotone-edit-off'
    ),
    tooltip: computed(() => (!isEdit.value ? 'Edit' : 'View'))
  },
  {
    type: 'button',
    event: 'zoomin',
    icon: 'solar:magnifer-zoom-in-linear',
    tooltip: 'Zomm In'
  },
  {
    type: 'button',
    event: 'zoomout',
    icon: 'solar:magnifer-zoom-out-linear',
    tooltip: 'Zomm Out'
  },
  {
    type: 'button',
    event: 'zoomreset',
    icon: 'solar:refresh-bold',
    tooltip: 'Zomm Reset'
  },
  {
    type: 'button',
    event: 'colorchange',
    icon: 'solar:pallete-2-linear',
    tooltip: 'Choose Color'
  },
  {
    type: 'toggle',
    event: 'mode',
    tooltip: 'Switch Theme'
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

  handleAddItem(Comp, props)
}

const handleClick = (node: DragItem) => {
  selectedItem.value = node
  selectedItem.value.active = true
}

const handleClear = () => {
  if (!selectedItem.value) return
  selectedItem.value.active = false
}

const handleAddItem = (
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

const updateSingleProp = ({
  key,
  value
}: {
  key: string
  value: string | boolean
}) => {
  const activeNode = components.value.find(
    (v) => v.id === selectedItem.value?.id
  )
  console.log(key, value)
  if (activeNode) {
    const targetProp = activeNode.props[key]
    if (!targetProp) return
    targetProp.value = value
  }
}

const updateDataProp = (
  key: string | number,
  value: string | boolean,
  column: string | number
) => {
  const activeNode = components.value.find(
    (v) => v.id === selectedItem.value?.id
  )
  if (activeNode) {
    const targetProp = activeNode.props?.columns[key]
    if (!targetProp) return
    targetProp[column] = value
  }
}

const addColumns = (index: number) => {
  const activeNode = components.value.find(
    (v) => v.id === selectedItem.value?.id
  )
  if (activeNode) {
    const newColumn = {
      key: '1',
      label: '1',
      width: '',
      sort: false
    }

    if (index === -1) {
      activeNode.props.columns.push(newColumn)
    } else {
      activeNode.props.columns.splice(index + 1, 0, newColumn)
    }
  }
}
const removeColumns = (index: number) => {
  const activeNode = components.value.find(
    (v) => v.id === selectedItem.value?.id
  )
  if (activeNode) {
    activeNode.props.columns.splice(index, 1)
  }
}

const handleTool = (target: string) => {
  const actions: Record<string, () => void> = {
    zoomin: () => zoomIn(),
    zoomout: () => zoomOut(),
    zoomreset: () => resetZoom(),
    view: () => (isEdit.value = !isEdit.value),
    colorchange: () => colorPaletteRef.value.toggle(event)
  }

  actions[target]?.()
}

const setGlobalPrimaryColor = (color: string) => {
  const root = document.documentElement

  root.style.setProperty('--p-primary-500', color)
}

defineExpose({ currentActive })
</script>

<style lang="scss" scoped>
.view-mode {
  border: none;
}
</style>
