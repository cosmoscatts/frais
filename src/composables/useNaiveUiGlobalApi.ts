import type { ConfigProviderProps } from 'naive-ui'
import {
  createDiscreteApi,
  darkTheme,
  lightTheme,
} from 'naive-ui'

/**
 * 封装 `Naive UI` 提供的全局 `Api`
 * 如何使用？
 * `const { message } = useGlobalNaiveApi()`
 * `message.success('使用成功')`
 * 搭配 `unplugin-auto-import` 可以不用 `import`，十分方便
 */
export function useGlobalNaiveApi() {
  const appStore = useAppStore()

  const configProviderProps = computed<ConfigProviderProps>(() => {
    const { themeOverrides } = appStore
    return {
      theme: isDark.value
        ? darkTheme
        : lightTheme,
      themeOverrides,
    }
  })

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
