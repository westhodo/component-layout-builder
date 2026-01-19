<template>
  <ComponentPalette @select-menu="handleMenuClick" />

  <div class="h-screen w-full overflow-auto">
    <div
      class="h-full w-full"
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
          :class="{ 'border-0!': !isEdit }"
          v-for="node in components"
          :key="node.id"
          :x="node.x"
          :y="node.y"
          :w="node.w"
          :h="node.h"
          :active="node.active"
          :resizable="node.resizable"
          @click="handleClick(node)"
          @dblclick="handleFrameTop"
          @drag="handleClick(node)"
          @update:x="(val: any) => updatePotision(node.id, { x: val })"
          @update:y="(val: any) => updatePotision(node.id, { y: val })"
          :grid="grid"
          :style="{ zIndex: node.zIndex }"
        >
          <div class="h-full w-full overflow-hidden p-1">
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
        @click="
          ((customColor = ''),
          setGlobalPrimaryColor(color),
          (selectedColor = index))
        "
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
      <li
        class="flex h-6 w-6 items-center justify-center rounded-4xl"
        :class="{ 'border-2': customColor }"
        :style="`border-color: #${customColor};`"
      >
        <ColorPicker
          v-model="customColor"
          format="hex"
          class="flex h-4.5 w-4.5 overflow-hidden rounded-4xl"
        />
      </li>
    </ul>
  </Popover>
</template>
<script setup lang="ts">
import {
  computed,
  markRaw,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
  type Component
} from 'vue'
import Draggable from 'draggable-resizable-vue3'
import { componentRegistry, type ComponentKey } from '../elements'
import { colorPalette } from '@/constants/layout'
import { debounce } from 'lodash'

interface DragItem {
  id: string
  componentKey: ComponentKey
  component: Component
  props: Record<string, unknown>
  x: number
  y: number
  w?: number
  h?: number
  active: boolean
  resizable: boolean
  zIndex?: number
}

interface DragItemSchema {
  id: string
  componentKey: ComponentKey
  props: Record<string, unknown>
  x: number
  y: number
  w?: number
  h?: number
  zIndex?: number
}
const components = ref<DragItem[]>([])
const zoom = ref(1)
const selectedColor = ref<number | null>(0)
const grid = ref([2, 2])
const canvasWidth = ref(5000)
const canvasHeight = ref(5000)
const selectedItem = ref<DragItem | null>(null)
const isEdit = ref(true)
const currentActive = ref(false)
const colorPaletteRef = ref()
const customColor = ref('')
const zIndexCount = ref(0)

const template = reactive([
  {
    type: 'button',
    event: 'view',
    icon: computed(() =>
      !isEdit.value
        ? 'fluent:keyboard-layout-resize-20-filled'
        : 'ri:cursor-fill'
    ),
    tooltip: computed(() => (!isEdit.value ? 'Item Resize' : 'Item Move'))
  },
  // {
  //   type: 'button',
  //   event: 'zoomin',
  //   icon: 'solar:magnifer-zoom-in-linear',
  //   tooltip: 'Zomm In'
  // },
  // {
  //   type: 'button',
  //   event: 'zoomout',
  //   icon: 'solar:magnifer-zoom-out-linear',
  //   tooltip: 'Zomm Out'
  // },
  // {
  //   type: 'button',
  //   event: 'zoomreset',
  //   icon: 'solar:refresh-bold',
  //   tooltip: 'Zomm Reset'
  // },
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

const saveLayout = debounce(() => {
  localStorage.setItem('layout', JSON.stringify(setItemSave(components.value)))
}, 300)

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

watch(customColor, (val) => {
  setGlobalPrimaryColor('#' + val)
  selectedColor.value = null
})

watch(components, saveLayout, { deep: true })

onMounted(() => {
  try {
    const raw = localStorage.getItem('layout')
    if (!raw) return
    components.value = getItemSave(JSON.parse(raw))
  } catch (e) {
    console.warn('layout restore failed', e)
    localStorage.removeItem('layout')
  }
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && selectedItem.value) {
    const index = components.value.findIndex(
      (item) => item.id === selectedItem.value?.id
    )
    if (index !== -1) {
      components.value.splice(index, 1)
    }
  }
}

const zoomIn = () => (zoom.value += 0.1)
const zoomOut = () => (zoom.value = Math.max(0.1, zoom.value - 0.1))
const resetZoom = () => (zoom.value = 1)

const setItemSave = (nodes: DragItem[]): DragItemSchema[] => {
  return nodes.map((node) => ({
    id: node.id,
    componentKey: node.componentKey,
    props: node.props,
    x: node.x,
    y: node.y,
    w: node.w,
    h: node.h,
    zIndex: node.zIndex
  }))
}

const getItemSave = (schemas: DragItemSchema[]): DragItem[] => {
  return schemas.map((schema) => {
    const entry = componentRegistry[schema.componentKey]

    return {
      id: schema.id,
      componentKey: schema.componentKey,
      component: markRaw(entry.component),
      props: reactive(schema.props),
      x: schema.x,
      y: schema.y,
      w: schema.w,
      h: schema.h,
      zIndex: schema.zIndex,
      active: false,
      resizable: isEdit.value
    }
  })
}

const handleMenuClick = (menu: { label: ComponentKey }) => {
  handleAddItem(menu.label)
}

const handleClick = (node: DragItem) => {
  selectedItem.value = node
  components.value.forEach((item) => (item.active = false))
  selectedItem.value.active = true
}

const handleFrameTop = () => {
  if (!selectedItem.value) return

  zIndexCount.value += 1
  selectedItem.value.zIndex = zIndexCount.value
}

const handleClear = () => {
  if (!selectedItem.value) return
  selectedItem.value.active = false
}

const handleAddItem = (key: ComponentKey) => {
  const entry = componentRegistry[key]

  components.value.push({
    id: crypto.randomUUID(),
    componentKey: key,
    component: markRaw(entry.component),
    props: reactive(entry.defaultProps()),
    x: 500,
    y: 200,
    active: false,
    resizable: isEdit.value,
    zIndex: ++zIndexCount.value
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
  if (activeNode) {
    const targetProp = activeNode.props[key]
    if (
      typeof targetProp === 'object' &&
      targetProp !== null &&
      'value' in targetProp
    ) {
      targetProp.value = value
    }
  }
}

const updateDataProp = (
  index: number,
  value: string | boolean,
  column: string | number,
  key: string
) => {
  const activeNode = components.value.find(
    (v) => v.id === selectedItem.value?.id
  )

  if (activeNode) {
    const targetArray = activeNode.props?.[key] as unknown[]
    const targetProp = targetArray?.[index]

    if (!targetProp) return
    ;(targetProp as Record<string | number, unknown>)[column] = value
  }
}

const createItemByKey = (key: string) => {
  switch (key) {
    case 'column':
      return {
        key: crypto.randomUUID(),
        label: 'column',
        width: '',
        sort: false
      }

    case 'tabData':
      return {
        value: crypto.randomUUID(),
        title: 'Title',
        content: ''
      }

    default:
      return null
  }
}

const addColumns = (key: string, index: number) => {
  const activeNode = components.value.find(
    (v) => v.id === selectedItem.value?.id
  )
  if (!activeNode) return

  const target = activeNode.props[key]
  if (!Array.isArray(target)) return

  const newItem = createItemByKey(key)
  if (!newItem) return

  const insertIndex = index === -1 ? target.length : index + 1
  target.splice(insertIndex, 0, newItem)
}

const removeColumns = (key: string, index: number) => {
  const activeNode = components.value.find(
    (v) => v.id === selectedItem.value?.id
  )
  if (!activeNode) return

  const target = activeNode.props[key]
  if (!Array.isArray(target)) return
  if (index < 0 || index >= target.length) return

  target.splice(index, 1)
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
  const isDark = root.classList.contains('app-theme-dark')

  if (isDark) {
    root.style.setProperty('--p-primary-400', color)
    root.style.setProperty('--p-primary-500', color)
  } else root.style.setProperty('--p-primary-500', color)
}

defineExpose({ currentActive })
</script>
