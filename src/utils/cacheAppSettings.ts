import type { RemovableRef } from '@vueuse/core'
import { wrapStorageKey } from './wrapStorageKey'
import type { ConfigSettingObject } from '~/config'

/** `app-settings` 缓存在 `storage` 中的 `key` */
const APP_SETTINGS_KEY = wrapStorageKey('APP_SETTINGS')
const APP_SETTINGSStorage: RemovableRef<ConfigSettingObject | Object> = useStorage(APP_SETTINGS_KEY, {}, localStorage)

/**
 * 将 `settings` 写入 `storage`
 */
export const cacheSettingsOnStorage = (settings = {}) => {
  if (!APP_SETTINGSStorage.value)
    return
  APP_SETTINGSStorage.value = settings
}

/**
 * 从 `storage` 更新 `settings`
 */
export const updateSettingsFromStorage = (target: ConfigSettingObject) => {
  const source = APP_SETTINGSStorage.value

  if (!source || !Object.keys(source).length)
    return { ...target }

  return {
    ...target,
    ...source,
  }
}
