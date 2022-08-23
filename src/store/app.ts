import type { ConfigSettingObject } from '~/config'
import { cacheAppSettings, configSettings } from '~/config'
import { changeThemePrimaryColor, initAppSettings } from '~/utils'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const {
      initStorage,
      cacheSettingsOnStorage,
      updateSettingsFromStorage,
    } = initAppSettings()

    // app 配置对象
    const baseSettings = ref<ConfigSettingObject>({
      ...configSettings,
    })
    // app 暂存配置对象
    const stageSettings = ref<ConfigSettingObject>({
      ...configSettings,
    })

    const init = () => {
      // 如果开启了缓存配置, 则从 storage 更新配置
      if (cacheAppSettings)
        initStorage()

      baseSettings.value = {
        ...updateSettingsFromStorage({
          ...configSettings,
        }),
      }

      // 根据主题主色调配置，生成颜色
      changeThemePrimaryColor(baseSettings.value.themePrimaryColor)
    }
    init()

    // 初始化 app 设置项的暂存区
    const buildStageData = () => {
      const source = { ...baseSettings.value } as ConfigSettingObject
      stageSettings.value = { ...source } || { ...configSettings }
    }
    buildStageData()

    function resetStageData() {
      buildStageData()
    }

    // 从暂存区更新设置
    function updateSettingsFromStageData() {
      const originThemePrimaryColor = baseSettings.value.themePrimaryColor

      baseSettings.value = { ...stageSettings.value } || { ...configSettings }

      // 如果主题主要色调发生改变，替换主色调
      if (originThemePrimaryColor !== baseSettings.value.themePrimaryColor)
        changeThemePrimaryColor(baseSettings.value.themePrimaryColor)

      if (cacheAppSettings)
        cacheSettingsOnStorage({ ...baseSettings.value })
    }

    // 菜单是否折叠
    const { bool: menuCollapsed, toggleBool: toggleMenuCollapsed } = useBoolean(false)

    return {
      baseSettings,
      stageSettings,
      resetStageData,
      updateSettingsFromStageData,
      menuCollapsed,
      toggleMenuCollapsed,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
