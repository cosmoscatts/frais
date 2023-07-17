import type { RemovableRef } from '@vueuse/core'
import { SETTINGS_STORAGE_KEY, TABS_STORAGE_KEY } from '~/constants'
import type { Settings } from '~/configs'
import type { Tab } from '~/types'

const tabStorage: RemovableRef<{ [key: string]: Tab[] }> = useStorage(TABS_STORAGE_KEY, {}, localStorage)
const settingsStorage: RemovableRef<Settings | object> = useStorage(SETTINGS_STORAGE_KEY, {}, localStorage)

/**
 * 将 settings 写入 storage
 */
export function cacheSettings(settings = {}) {
  settingsStorage.value = clone(settings)
}

/**
 * 应用缓存的 settings
 */
export function applyCachedSettings(source: Settings) {
  return {
    ...clone(source),
    ...(settingsStorage.value ?? {}),
  }
}

/**
 * 获取 [tab storage] 中的 key
 */
function getTabStorageKey(): string | null {
  const userStore = useAuthStore()
  if (!userStore.user?.id)
    return null
  return `user-${userStore.user.id}`
}

/**
 * 将 tabs 写入 storage
 */
export function cacheTabs(tabs: Tab[]) {
  const key = getTabStorageKey()
  if (!key)
    return
  if (!tabStorage.value)
    tabStorage.value = {}
  tabStorage.value[key] = [...tabs]
}

/**
 * 应用缓存的 tabs
 */
export function applyCachedTabs(): Tab[] {
  const key = getTabStorageKey()
  if (!key)
    return []
  const tabData = tabStorage.value || {}
  return tabData[key] || []
}

/**
 * 清除缓存的 tab
 */
export function clearCachedTabs() {
  tabStorage.value = {}
}
