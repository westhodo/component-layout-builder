<template>
  <Drawer
    :visible="localVisible"
    @update:visible="updateVisible"
    header="Type 선택"
  >
    <ul class="flex flex-wrap items-center gap-4">
      <li
        v-for="(type, index) in typeList"
        :key="index"
        class="relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border"
        @click="(e) => emit('selected', e, type)"
      >
        <div class="flex flex-col items-center justify-center gap-2">
          <i :class="type.icon"></i>
          <p class="text-sm">{{ type.label }}</p>
        </div>
        <div
          v-if="type.label === 'IMAGE'"
          class="absolute top-0 left-0 h-full w-full border bg-amber-500 opacity-0"
        >
          <FileUpload
            id="fileupload"
            ref="fileupload"
            mode="basic"
            name="demo[]"
            url="/api/upload"
            accept="image/*"
            :maxFileSize="10000000"
            chooseLabel=""
            @select="(e) => emit('onSelect', e)"
          />

          <Button label="Upload" @click="upload" severity="secondary" />
        </div>
      </li>
    </ul>
  </Drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  visible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false
})

const emit = defineEmits(['update:visible', 'selected', 'onSelect'])

const localVisible = ref<boolean>(props.visible)
const fileupload = ref()

watch(
  () => props.visible,
  (v) => {
    localVisible.value = v
  }
)

function updateVisible(value: boolean) {
  localVisible.value = value
  emit('update:visible', value)
}

const typeList = [
  { label: 'IMAGE', icon: 'pi pi-cog' },
  { label: 'TEXT', icon: 'pi pi-cog' },
  { label: 'VIDEO', icon: 'pi pi-cog' },
  { label: 'BUTTON', icon: 'pi pi-cog' },
  { label: 'ICON', icon: 'pi pi-cog' },
  { label: 'Delete', icon: 'pi pi-cog' }
]

const upload = () => {
  fileupload.value.upload()
}
</script>
<style scoped></style>
