import type { ConfigProviderProps } from 'naive-ui'
import {
  createDiscreteApi,
  darkTheme,
  lightTheme,
} from 'naive-ui'

import { appMeta } from '~/config'

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

/**
 * 创建页面 `head` 数据
 */
export function useHeadMeta() {
  const { name, description } = appMeta
  useHead({
    title: name,
    meta: [
      { name: 'description', content: description },
      {
        name: 'theme-color',
        content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: computed(() => isDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
      },
    ],
  })
}

type TargetContext = '_self' | '_parent' | '_blank' | '_top'

/**
 * 封装打开窗口的通用方法
 * @param url
 * @param opts
 */
export function useOpenWindow(
  url: string,
  opts?: {
    target?: TargetContext
    [key: string]: any
  },
) {
  const { target = '_blank', ...others } = opts || {}
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue
        return [...preValue, `${key}=${value}`]
      }, [])
      .join(','),
  )
}

/**
 * 退出登录时，清楚 `store` 中的内容
 */
export function useLogout() {
  const { removeUser } = useUserStore()
  const { removeAllTabs } = useTabStore()
  const { removeAppMenus } = usePermissionStore()
  const actions = [removeUser, removeAllTabs, removeAppMenus]

  actions.forEach((removeEffect) => {
    removeEffect()
  })
}
