<template>
  <Drawer
    :visible="localVisible.value"
    @update:visible="updateVisible"
    header="Type 선택"
  >
    <ul class="flex flex-wrap items-center gap-4">
      <li
        v-for="(type, index) in typeList"
        :key="index"
        class="flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-2xl border"
      >
        <i :class="type.icon"></i>
        <p class="text-sm">{{ type.label }}</p>
      </li>
    </ul>
  </Drawer>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface Props {
  visible: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false
})

const localVisible = reactive({ value: props.visible })
const emit = defineEmits(['update:visible'])

function updateVisible(value: boolean) {
  localVisible.value = value
  emit('update:visible', value)
}

const typeList = reactive([
  {
    label: 'IMAGE',
    icon: 'pi pi-cog'
  },
  {
    label: 'TEXT',
    icon: 'pi pi-cog'
  },
  {
    label: 'IMAGE',
    icon: 'pi pi-cog'
  },
  {
    label: 'VIDEO',
    icon: 'pi pi-cog'
  },
  {
    label: 'BUTTON',
    icon: 'pi pi-cog'
  },
  {
    label: 'ICON',
    icon: 'pi pi-cog'
  }
])
</script>
