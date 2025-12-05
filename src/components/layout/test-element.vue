<template>
  <div>
    <template v-if="node.type === 'image'">
      <div class="h-full w-full">
        <img :src="node.path" alt="" class="h-full w-full object-cover" />
      </div>
    </template>
    <template v-else>
      <span class="text">
        {{ props.node.text }}
      </span>
    </template>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'

interface NodeItem {
  text: string
  type: string
  edit: boolean
  path?: string
}

interface Props {
  node: NodeItem
}

const props = withDefaults(defineProps<Props>(), {
  node: () => ({ text: '', type: '', edit: false, path: '' })
})

onMounted(() => {})
</script>
<style scoped>
.remove {
  position: absolute;
  right: 2px;
  top: 0;
  cursor: pointer;
}
</style>
