import type { ConfigProviderProps } from 'naive-ui'
import {
  createDiscreteApi,
  darkTheme,
  lightTheme,
} from 'naive-ui'

const configProviderProps = computed<ConfigProviderProps>(() => ({
  theme: isDark.value
    ? darkTheme
    : lightTheme,
}))

/**
 * 封装 Naive UI 提供的全局 Api
 */
export function useGlobalNaiveApi() {
  const {
    dialog,
    message,
    notification,
    loadingBar,
  } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    { configProviderProps },
  )

  return {
    dialog,
    message,
    notification,
    loadingBar,
  }
}
