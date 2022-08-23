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
    const settings = reactive<{
      stage?: ConfigSettingObject
      data?: ConfigSettingObject
    }>({
      stage: undefined,
      data: undefined,
    })

    const init = () => {
      if (cacheAppSettings) {
        initStorage()
        settings.data = updateSettingsFromStorage(reactive({
          ...configSettings,
        })) || { ...configSettings }
      }
      // 根据主题主色调配置，生成颜色
      changeThemePrimaryColor(settings.data?.themePrimaryColor)
    }
    init()

    // 初始化 app 设置项的暂存区
    const buildStageData = () => {
      const source = { ...settings.data } as ConfigSettingObject
      settings.stage = { ...source } || { ...configSettings }
    }
    buildStageData()

    function resetStageData() {
      buildStageData()
    }

    // 从暂存区更新设置
    function updateSettingsFromStageData() {
      const originThemePrimaryColor = settings.data?.themePrimaryColor
        || configSettings.themePrimaryColor

      const source = { ...settings.stage } as ConfigSettingObject
      settings.data = { ...source } || { ...configSettings }

      // 如果主题主要色调发生改变，替换主色调
      if (originThemePrimaryColor !== settings.data.themePrimaryColor)
        changeThemePrimaryColor(settings.data?.themePrimaryColor)

      if (cacheAppSettings)
        cacheSettingsOnStorage({ ...settings.data })
    }

    // 菜单是否折叠
    const { bool: menuCollapsed, toggleBool: toggleMenuCollapsed } = useBoolean(false)

    return {
      settings,
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
