<template>
  <div class="control-panel">
    <div class="mb-2 flex gap-2">
      <Button
        size="small"
        @click="handlwCurrentEdit"
        :label="isCurrentEdit ? '편집모드 실행중' : '편집모드 비활성'"
      />
      <Button size="small" @click="decreaseWidth">Decrease Width</Button>
      <Button size="small" @click="increaseWidth">Increase Width</Button>
      <Button size="small" @click="scaleHalf">Scale x0.5</Button>
      <Button size="small" @click="scaleThreeQuarters">Scale x0.75</Button>
      <Button size="small" @click="scaleIdentity">Scale x1.0</Button>
      <Button size="small" @click="addItem">Add an item</Button>
      <Button size="small" @click="addItemDynamically"
        >Add an item dynamically</Button
      >
      <Button size="small" @click="changeDirection">Change Direction</Button>
    </div>
    <div class="flex gap-4">
      <Checkbox type="checkbox" v-model="state.draggable" /> Draggable
      <Checkbox type="checkbox" v-model="state.resizable" /> Resizable
      <Checkbox type="checkbox" v-model="state.mirrored" /> Mirrored
      <Checkbox type="checkbox" v-model="state.bounded" /> Bounded
      <Checkbox type="checkbox" v-model="state.responsive" /> Responsive
      <Checkbox type="checkbox" v-model="state.preventCollision" /> Prevent
      Collision <Checkbox type="checkbox" v-model="state.compact" /> Vertical
      Compact
    </div>
    <div style="margin-top: 10px; margin-bottom: 10px">
      Row Height:
      <InputText size="small" type="number" v-model="state.rowHeight" /> Col
      nums:
      <InputText size="small" type="number" v-model="state.colNum" /> Margin x:
      <InputText size="small" type="number" v-model="state.marginX" /> Margin y:
      <InputText size="small" type="number" v-model="state.marginY" />
    </div>
    <GridLayout
      :ref="setRef"
      id="grid-layout-test"
      :margin="[parseInt(state.marginX), parseInt(state.marginY)]"
      v-model:layout="state.layout"
      :col-num="parseInt(state.colNum)"
      :row-height="state.rowHeight"
      :is-draggable="state.draggable"
      :is-resizable="state.resizable"
      :is-mirrored="state.mirrored"
      :is-bounded="state.bounded"
      :prevent-collision="state.preventCollision"
      :vertical-compact="state.compact"
      :restore-on-drag="state.restoreOnDrag"
      :use-css-transforms="true"
      :responsive="state.responsive"
      :transform-scale="state.transformScale"
      @layout-created="layoutCreatedEvent"
      @layout-before-mount="layoutBeforeMountEvent"
      @layout-mounted="layoutMountedEvent"
      @layout-ready="layoutReadyEvent"
      @layout-updated="layoutUpdatedEvent"
      @breakpoint-changed="breakpointChangedEvent"
    >
      <GridItem
        class="overflow-hidden border border-dashed"
        v-for="item in state.layout"
        :key="item.i"
        TestElement
        :static="item.static"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :min-w="item.minW"
        :max-w="item.maxW"
        :min-x="item.minX"
        :max-x="item.maxX"
        :min-y="item.minY"
        :max-y="item.maxY"
        :preserve-aspect-ratio="item.preserveAspectRatio"
        @resize="resize"
        @move="move"
        @resized="resized"
        @container-resized="containerResized"
        @moved="moved"
      >
        <TestElement :node="item" @remove-item="removeItem($event)" />
        <div
          class="flex h-full w-full items-center justify-center hover:bg-amber-200"
          @mouseenter="hanldeMouseEnter(item)"
          @mouseleave="handleMouseLeave(item)"
        >
          <Button
            v-if="item.enter"
            outlined
            icon="pi pi-pen-to-square"
            @click="handleClick(item)"
          />
        </div>
      </GridItem>
    </GridLayout>
  </div>
  <DrawerDialog :visible="isVisible" />
  <!-- <Dialog
    v-model:visible="isVisible"
    header="Type 선택"
    :style="{ width: '25rem' }"
  >

  </Dialog> -->
</template>
<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { GridLayout, GridItem } from 'vue-grid-layout-v3'
import TestElement from './test-element.vue'
import { getDocumentDir, setDocumentDir } from './dom'
import { layout } from '@/constants/layout'
import DrawerDialog from '../typeSelct/DrawerDialog.vue'
const isEnter = ref(false)
const isVisible = ref(false)
const isCurrentEdit = ref(false)

const state = reactive({
  layout: JSON.parse(JSON.stringify(layout)),
  layout2: JSON.parse(JSON.stringify(layout)),
  draggable: true,
  resizable: true,
  mirrored: false,
  responsive: true,
  bounded: false,
  transformScale: 1,
  preventCollision: false,
  compact: true,
  // restoreOnDrag: true,
  rowHeight: 30,
  colNum: 12,
  index: 0,
  marginX: 10,
  marginY: 10
})

let layoutRef

onMounted(() => {
  state.index = state.layout.length
  // console.info(layoutRef)
})

const handlwCurrentEdit = () => {
  isCurrentEdit.value = !isCurrentEdit.value
}

// function clicked()  {
//   window.alert("CLICK!");
// }
const handleClick = (node) => {
  console.log('click', node)
  node.edit = !node.edit
  isVisible.value = true
}
function increaseWidth() {
  let width = document.getElementById('grid-layout-test').offsetWidth
  width += 20
  document.getElementById('grid-layout-test').style.width = `${width}px`
}

function decreaseWidth() {
  let width = document.getElementById('grid-layout-test').offsetWidth
  width -= 20
  document.getElementById('grid-layout-test').style.width = `${width}px`
}

function scaleHalf() {
  state.transformScale = 0.5
  document.getElementById('grid-layout-test').style.transform = 'scale(0.5)'
}

function scaleThreeQuarters() {
  state.transformScale = 0.75
  document.getElementById('grid-layout-test').style.transform = 'scale(0.75)'
}

function scaleIdentity() {
  state.transformScale = 1
  document.getElementById('grid-layout-test').style.transform = 'scale(1)'
}

function removeItem(i) {
  // console.info(`### REMOVE ${i}`);
  const index = state.layout.map((item) => item.i).indexOf(i)
  state.layout.splice(index, 1)
}

function addItem() {
  // let self = state;
  // console.info("### LENGTH: " + state.layout.length);
  const item = { x: 0, y: 0, w: 2, h: 2, i: `${state.index}`, whatever: 'bbb' }
  state.index++
  state.layout.push(item)
}

function addItemDynamically() {
  const x = Math.round(Math.random() * (state.colNum || 12)) // (state.layout.length * 2) % (state.colNum || 12);
  const y = Math.round(Math.random() * 100) // state.layout.length + (state.colNum || 12);
  // console.info(`X=${x} Y=${y}`);
  const item = {
    x,
    y,
    w: 2,
    h: 2,
    i: `${state.index}`
  }
  state.index++
  state.layout.push(item)
}

function move(i, newX, newY) {
  // console.info(`MOVE i=${i}, X=${newX}, Y=${newY}`)
}

function resize(i, newH, newW, newHPx, newWPx) {
  console
    .info
    // `RESIZE i=${i}, H=${newH}, W=${newW}, H(px)=${newHPx}, W(px)=${newWPx}`
    ()
}

function moved(i, newX, newY) {
  // console.info(`### MOVED i=${i}, X=${newX}, Y=${newY}`)
}

function resized(i, newH, newW, newHPx, newWPx) {
  console
    .info
    // `### RESIZED i=${i}, H=${newH}, W=${newW}, H(px)=${newHPx}, W(px)=${newWPx}`
    ()
}

function containerResized(i, newH, newW, newHPx, newWPx) {
  console
    .info
    // `### CONTAINER RESIZED i=${i}, H=${newH}, W=${newW}, H(px)=${newHPx}, W(px)=${newWPx}`
    ()
}

/**
 * Add change direction Button
 */
function changeDirection() {
  const documentDirection = getDocumentDir()
  let toggle = ''
  if (documentDirection === 'rtl') {
    toggle = 'ltr'
  } else {
    toggle = 'rtl'
  }
  setDocumentDir(toggle)
  state.mirrored = toggle === 'rtl'
}

function layoutCreatedEvent(newLayout) {
  // console.info('Created layout: ', newLayout)
}

function layoutBeforeMountEvent(newLayout) {
  // console.info('beforeMount layout: ', newLayout)
}

function layoutMountedEvent(newLayout) {
  // console.info('Mounted layout: ', newLayout)
}

function layoutReadyEvent(newLayout) {
  // console.info('Ready layout: ', newLayout)
}

function layoutUpdatedEvent(newLayout) {
  // console.info('Updated layout: ', newLayout)
}
function breakpointChangedEvent(newBreakpoint, newLayout) {
  console
    .info
    // 'breakpoint changed breakpoint=',
    // newBreakpoint,
    // ', layout: ',
    // newLayout
    ()
}
function setRef(e) {
  layoutRef = e
}

const hanldeMouseEnter = (node) => {
  node.enter = true
}

const handleMouseLeave = (node) => {
  node.enter = false
}
</script>
<style scoped></style>
