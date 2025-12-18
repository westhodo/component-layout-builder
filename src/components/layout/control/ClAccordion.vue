<template>
  <div
    v-for="(form, index) in props.data"
    :key="index"
    class="border-primary mb-2 ml-[4.5px] border-l-2 pt-1"
  >
    <div class="flex flex-col gap-2 px-4 py-1">
      <div>
        <p class="mb-2 text-xs font-bold">Title</p>
        <InputText
          placeholder="Please enter a text."
          class="w-full"
          type="text"
          size="small"
          :value="form.title"
          @input="
            (e) =>
              updateDataProp(
                index,
                (e.target as HTMLInputElement).value,
                'title',
                'tabData'
              )
          "
        />
      </div>
      <div>
        <p class="mb-2 text-xs font-bold">Content</p>
        <Textarea
          placeholder="Please enter a text."
          class="w-full"
          size="small"
          rows="4"
          :value="form.content"
          @input="
            (e) =>
              updateDataProp(
                index,
                (e.target as HTMLInputElement).value,
                'content',
                'tabData'
              )
          "
        />
      </div>
      <div class="flex items-center justify-end gap-1">
        <Button
          class="h-6! w-6!"
          :class="{
            'pointer-events-none opacity-0': props.data.length === 1
          }"
          icon="pi pi-minus"
          outlined
          rounded
          size="small"
          severity="danger"
          @click="emit('remove-column', index)"
        />
        <Button
          icon="pi pi-plus"
          outlined
          rounded
          size="small"
          class="h-6! w-6!"
          @click="emit('add-column', index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Column {
  title: string
  content: string
}
interface Props {
  data: Column[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

const emit = defineEmits(['update-data-prop', 'add-column', 'remove-column'])

const updateDataProp = (
  index: number,
  value: unknown,
  column: string,
  key: string
) => {
  emit('update-data-prop', index, value, column, key)
}
</script>
