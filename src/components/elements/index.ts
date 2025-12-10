import ElButton from './ElButton.vue'
import ElCheckbox from './ElCheckbox.vue'

export const componentRegistry = {
  Button: {
    component: ElButton,
    defaultProps: () => ({
      label: { type: 'input', value: 'Button' },
      severity: {
        type: 'select',
        value: 'Primary',
        option: [
          'Primary',
          'secondary',
          'success',
          'info',
          'warn',
          'help',
          'danger',
          'contrast'
        ]
      },
      size: {
        type: 'select',
        value: 'small',
        option: ['small', 'large']
      },
      disabled: {
        type: 'select',
        value: false,
        option: [true, false]
      },
      raised: {
        type: 'select',
        value: false,
        option: [true, false]
      },
      rounded: {
        type: 'select',
        value: false,
        option: [true, false]
      },
      text: {
        type: 'select',
        value: false,
        option: [true, false]
      },
      outlined: {
        type: 'select',
        value: false,
        option: [true, false]
      }
    })
  },
  Checkbox: {
    component: ElCheckbox,
    defaultProps: () => ({
      label: { type: 'input', value: '' },
      id: { type: 'input', value: 'test' },
      size: {
        type: 'select',
        value: 'small',
        option: ['small', 'large']
      },
      disabled: {
        type: 'select',
        value: false,
        option: [true, false]
      },
      invalid: {
        type: 'select',
        value: false,
        option: [true, false]
      }
    })
  }
} as const

export type ComponentKey = keyof typeof componentRegistry
