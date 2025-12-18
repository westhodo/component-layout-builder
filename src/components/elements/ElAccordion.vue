<template>
  <Accordion value="0">
    <AccordionPanel
      v-for="tab in props.tabData"
      :key="tab.title"
      :value="tab.value"
    >
      <AccordionHeader>{{ tab.title }}</AccordionHeader>
      <AccordionContent>
        <pre>{{ tab.content }}</pre>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<script setup lang="ts">
interface Data {
  title: string
  content: string
  value?: string
}

interface Props {
  tabData?: Data[]
}

const props = withDefaults(defineProps<Props>(), {
  tabData: () => []
})
</script>
