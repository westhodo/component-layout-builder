<template>
  <Tabs value="0" scrollable>
    <TabList>
      <Tab
        v-for="tab in props.tabData"
        :key="tab.title"
        :value="String(tab.value)"
      >
        {{ tab.title }}
      </Tab>
    </TabList>
    <TabPanels class="h-full w-full">
      <TabPanel
        v-for="tab in props.tabData"
        :key="tab.content"
        :value="String(tab.value)"
      >
        <p class="m-0 wrap-break-word">{{ tab.content }}</p>
      </TabPanel>
    </TabPanels>
  </Tabs>
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
