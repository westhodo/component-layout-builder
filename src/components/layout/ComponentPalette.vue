<template>
  <nav class="z-10 flex h-screen">
    <ul
      class="h-full w-full overflow-x-hidden overflow-y-auto bg-white p-4 shadow-xl dark:bg-zinc-950"
    >
      <li
        v-for="(depth1, index) in component"
        :key="index"
        class="flex flex-wrap gap-2"
      >
        <p class="mt-3 w-full font-bold dark:text-white">{{ depth1.title }}</p>
        <div
          v-for="(depth2, index2) in depth1.children"
          :key="index2"
          class="flex w-full cursor-pointer items-center gap-2 rounded-2xl bg-gray-50 p-3 transition hover:bg-gray-100 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-900"
          @click="emit('select-menu', depth2)"
        >
          <AppIcon :icon="depth2.icon" width="14" height="14"></AppIcon>
          <p class="text-xs">{{ depth2.label }}</p>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['select-menu'])

const component = ref([
  {
    title: 'Layout',
    children: [
      {
        label: 'Layer',
        icon: 'solar:layers-minimalistic-line-duotone'
      }
    ]
  },
  {
    title: 'Form',
    children: [
      {
        label: 'Checkbox',
        icon: 'solar:check-circle-linear'
      },
      {
        label: 'DatePicker',
        icon: 'solar:calendar-date-linear'
      },
      {
        label: 'InputOtp',
        icon: 'solar:password-linear'
      },
      {
        label: 'InputText',
        icon: 'solar:text-bold-duotone'
      },
      {
        label: 'Knob',
        icon: 'solar:round-graph-linear'
      },
      {
        label: 'Password',
        icon: 'solar:lock-password-outline'
      },
      {
        label: 'RadioButton',
        icon: 'material-symbols:radio-button-checked'
      },
      {
        label: 'Textarea',
        icon: 'solar:text-field-outline'
      },
      {
        label: 'ToggleSwitch',
        icon: 'material-symbols:toggle-off-outline'
      }
    ]
  },
  {
    title: 'Button',
    children: [
      {
        label: 'Button',
        icon: 'material-symbols:radio-button-partial'
      }
    ]
  },
  {
    title: 'Data',
    children: [
      {
        label: 'DataTable',
        icon: 'material-symbols:table-outline-sharp'
      },
      {
        label: 'Paginator',
        icon: 'material-symbols:page-control'
      },
      {
        label: 'Tree',
        icon: 'material-symbols:account-tree-outline-rounded'
      },
      {
        label: 'TreeTable',
        icon: 'ic:outline-grid-on'
      }
    ]
  },
  {
    title: 'Panel',
    children: [
      {
        label: 'Accordion',
        icon: 'material-symbols:keyboard-arrow-down-rounded'
      },
      {
        label: 'Card',
        icon: 'material-symbols:page-control'
      },
      {
        label: 'Divider',
        icon: 'material-symbols:account-tree-outline-rounded'
      },
      {
        label: 'Tabs',
        icon: 'ic:outline-grid-on'
      }
    ]
  },
  {
    title: 'File',
    children: [
      {
        label: 'FileUpload',
        icon: 'material-symbols:keyboard-arrow-down-rounded'
      }
    ]
  },
  {
    title: 'Menu',
    children: [
      {
        label: 'Breadcrumb',
        icon: 'material-symbols:keyboard-arrow-down-rounded'
      }
    ]
  }
])
</script>
