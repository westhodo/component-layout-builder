import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const createRange = (schema: string) => {
  const ranges: number[] = []

  for (let i = 50; i <= 950; i += 50) {
    ranges.push(i)
  }

  return {
    ...ranges.reduce(
      (acc, cur) => {
        acc[cur] = `{${schema}.${cur}}`
        return acc
      },
      {} as Record<number, string>
    )
  }
}

export const ThemePreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        surface: {
          ...createRange('slate')
        }
      },
      dark: {
        surface: {
          ...createRange('slate')
        }
      }
    },
    deepblue: {
      '50': '#eff8ff',
      '100': '#daf0ff',
      '200': '#bee4ff',
      '300': '#91d1ff',
      '400': '#5bbbff',
      '500': '#3b82f6',
      '600': '#119cff',
      '700': '#008ff5',
      '800': '#0078cd',
      '900': '#0062a8',
      '950': '#003e6b'
    },
    primary: {
      50: '{deepblue.50}',
      100: '{deepblue.100}',
      200: '{deepblue.200}',
      300: '{deepblue.300}',
      400: '{deepblue.400}',
      500: '{deepblue.500}',
      600: '{deepblue.600}',
      700: '{deepblue.700}',
      800: '{deepblue.800}',
      900: '{deepblue.900}',
      950: '{deepblue.950}'
    },
    surface: {
      ...createRange('zinc')
    }
  }
})
