import type { Tab } from '~/types'

export const tabStore = defineStore(
  'tabStore',
  () => {
    // 访问过的页面
    const tabs = ref<Tab[]>()
    // 需要缓存的页面名称
    const cachedPageNames = ref<string[]>()

    return {
      tabs,
      cachedPageNames,
    }
  },
)
