import ElLayer from './ElLayer.vue'
import ElButton from './ElButton.vue'
import ElCheckbox from './ElCheckbox.vue'
import ElDatePicker from './ElDatePicker.vue'
import ElInputOtp from './ElInputOtp.vue'
import ElInputText from './ElInputText.vue'
import ElPassword from './ElPassword.vue'
import ElRadioButton from './ElRadioButton.vue'
import ElRating from './ElRating.vue'
import ElTextarea from './ElTextarea.vue'
import ElToggleSwitch from './ElToggleSwitch.vue'

export const componentRegistry = {
  Layer: {
    component: ElLayer,
    defaultProps: () => ({
      width: {
        type: 'number',
        value: 360
      },
      height: {
        type: 'number',
        value: 720
      }
    })
  },
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
      badge: { type: 'input', value: '' },
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
      },
      reverse: {
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
  },
  InputOtp: {
    component: ElInputOtp,
    defaultProps: () => ({
      mode: {
        type: 'select',
        value: 'none',
        option: ['none', 'password']
      },
      input: {
        type: 'select',
        value: 'all',
        option: ['all', 'number']
      },
      size: {
        type: 'select',
        value: 'normal',
        option: ['normal', 'small', 'large']
      }
    })
  },
  InputText: {
    component: ElInputText,
    defaultProps: () => ({
      invalid: {
        type: 'select',
        value: false,
        option: [true, false]
      },
      helpText: {
        type: 'input',
        value: ''
      },
      helpTextColor: {
        type: 'select',
        value: 'error',
        option: ['secondary', 'success', 'info', 'warn', 'error', 'contrast']
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
  },
  Password: {
    component: ElPassword,
    defaultProps: () => ({
      invalid: {
        type: 'select',
        value: false,
        option: [true, false]
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
  },
  RadioButton: {
    component: ElRadioButton,
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
      },
      reverse: {
        type: 'select',
        value: false,
        option: [true, false]
      }
    })
  },
  Rating: {
    component: ElRating,
    defaultProps: () => ({
      count: {
        type: 'select',
        value: 5,
        option: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      },
      readonly: {
        type: 'select',
        value: false,
        option: [true, false]
      },
      disabled: {
        type: 'select',
        value: false,
        option: [true, false]
      }
    })
  },
  Textarea: {
    component: ElTextarea,
    defaultProps: () => ({
      invalid: {
        type: 'select',
        value: false,
        option: [true, false]
      },
      disabled: {
        type: 'select',
        value: false,
        option: [true, false]
      }
    })
  },
  ToggleSwitch: {
    component: ElToggleSwitch,
    defaultProps: () => ({
      invalid: {
        type: 'select',
        value: false,
        option: [true, false]
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
