import { useLocalStorage, usePreferredDark } from '@vueuse/core'
import { computed, onMounted } from 'vue'

const storageKey = 'app-theme'
const darkModeClass = 'app-theme-dark'

export function useTheme() {
  const storage = useLocalStorage(storageKey, 'system')
  const isDark = usePreferredDark()
  const theme = computed(() => {
    return storage.value === 'system'
      ? isDark.value
        ? 'dark'
        : 'light'
      : storage.value
  })

  const applyTheme = () => {
    const currentTheme = theme.value
    if (currentTheme === 'dark') {
      document.documentElement.classList.add(darkModeClass)
    } else {
      document.documentElement.classList.remove(darkModeClass)
    }
  }

  const toggleTheme = () => {
    const isCurrentlyDark =
      document.documentElement.classList.contains(darkModeClass)
    const newTheme = isCurrentlyDark ? 'light' : 'dark'
    storage.value = newTheme
    applyTheme()
  }

  onMounted(() => {
    applyTheme()
  })

  return {
    theme,
    toggleTheme
  }
}
