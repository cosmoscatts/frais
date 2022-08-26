import { wrapStorageKey } from './wrapStorageKey'
import { appStorageKeyEnum } from '~/enum'
import type { ConfigSettingObject } from '~/config'

const APP_SETTINGS_KEY = wrapStorageKey(appStorageKeyEnum.appSettings)
export function initAppSettings() {
  const appSettingsStorage = ref()

  // 初始化缓存设置的 `storage`
  const initStorage = () => {
    appSettingsStorage.value = useStorage(APP_SETTINGS_KEY, {}, localStorage)
  }

  // 将 `settings` 写入 `storage`
  const cacheSettingsOnStorage = (settings = {}) => {
    if (!appSettingsStorage.value)
      return
    appSettingsStorage.value = settings
  }

  // 从 `storage` 更新 `settings`
  const updateSettingsFromStorage = (target: ConfigSettingObject) => {
    const source = appSettingsStorage.value

    if (!source || !Object.keys(source).length)
      return { target }

    return {
      ...target,
      ...source,
    }
  }

  return {
    initStorage,
    cacheSettingsOnStorage,
    updateSettingsFromStorage,
  }
}
