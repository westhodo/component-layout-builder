<template>
  <div>
    <template v-if="node.type === 'img'">
      <div class="h-full w-full">
        <div v-if="node.edit">
          <FileUpload
            ref="fileupload"
            mode="basic"
            name="demo[]"
            url="/api/upload"
            accept="image/*"
            :maxFileSize="1000000"
            @upload="onUpload"
            @select="onSelect"
          />
          <Button label="Upload" @click="upload" severity="secondary" />
        </div>
        <img
          v-if="!node.edit"
          :src="path"
          alt=""
          class="h-full w-full object-cover"
        />
      </div>
    </template>
    <template v-else>
      <span class="text">
        {{ props.node.text }}
      </span>
      <span class="remove" @click="emit('removeItem', props.node.text)">x</span>
    </template>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface NodeItem {
  text: String
  type: String
  edit: Boolean
}

interface Props {
  node: NodeItem
}

const props = withDefaults(defineProps<Props>(), {
  node: () => ({ text: '', type: '', edit: false })
})

const emit = defineEmits(['removeItem', 'onUpload'])

onMounted(() => {
  // console.log(`### ${props.text} ready!`);
})

const path = ref('')

const fileupload = ref()

const upload = (e) => {
  fileupload.value.upload()
  console.log(e, 'e')
}

const onUpload = (e) => {
  console.log(e, 'e')
  const response = e.xhr.response ? JSON.parse(e.xhr.response) : {}
  path.value = response.url // 이미지 URL 설정
}

const onSelect = (e) => {
  console.log(e, 'e')
  const file = e.files[0]
  path.value = URL.createObjectURL(file) // Blob → 이미지 URL
}
</script>
<style scoped>
.remove {
  position: absolute;
  right: 2px;
  top: 0;
  cursor: pointer;
}
</style>
