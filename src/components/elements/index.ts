import ElButton from './ElButton.vue'
import ElCheckbox from './ElCheckbox.vue'
import ElDatePicker from './ElDatePicker.vue'

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
        value: 'normal',
        option: ['normal', 'small', 'large']
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
        value: 'normal',
        option: ['normal', 'small', 'large']
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
  },
  DatePicker: {
    component: ElDatePicker,
    defaultProps: () => ({
      useIcon: {
        type: 'select',
        value: true,
        option: [true, false]
      },
      useTime: {
        type: 'select',
        value: false,
        option: [true, false]
      },
      useButton: {
        type: 'select',
        value: false,
        option: [true, false]
      },
      format: {
        type: 'select',
        value: 'yy.mm.dd',
        option: [
          'yy.mm.dd',
          'yy-mm-dd',
          'yy/MM/dd',
          'yyyy.MM.dd',
          'yyyy-MM-dd',
          'yyyy/MM/dd',
          'MM/dd/yyyy',
          'MM-dd-yyyy',
          'M/d/yyyy',
          'MMM dd, yyyy',
          'MMMM dd, yyyy',
          'yyyyMMdd',
          'yyyy-MM-dd HH:mm',
          'yyyy.MM.dd HH:mm',
          'yyyy/MM/dd HH:mm',
          'yyyy-MM-dd HH:mm:ss',
          'yyyy-MM-dd hh:mm a'
        ]
      },
      mode: {
        type: 'select',
        value: 'single',
        option: ['single', 'range']
      },
      view: {
        type: 'select',
        value: 'day',
        option: ['day', 'month', 'year']
      },
      size: {
        type: 'select',
        value: 'normal',
        option: ['normal', 'small', 'large']
      },
      disabled: {
        type: 'select',
        value: false,
        option: [true, false]
      }
    })
  }
} as const

export type ComponentKey = keyof typeof componentRegistry
