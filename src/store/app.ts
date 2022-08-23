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
    const baseSettings = reactive<{
      stage?: ConfigSettingObject
      data?: ConfigSettingObject
    }>({
      stage: { ...configSettings },
      data: { ...configSettings },
    })

    const settings = computed(() => baseSettings.data)
    const stageSettings = computed(() => baseSettings.stage)

    const init = () => {
      // 如果开启了缓存配置, 则从 storage 更新配置
      if (cacheAppSettings) {
        initStorage()
        baseSettings.data = updateSettingsFromStorage(reactive({
          ...configSettings,
        })) || { ...configSettings }
      }
      // 根据主题主色调配置，生成颜色
      changeThemePrimaryColor(baseSettings.data?.themePrimaryColor)
    }
    init()

    // 初始化 app 设置项的暂存区
    const buildStageData = () => {
      const source = { ...baseSettings.data } as ConfigSettingObject
      baseSettings.stage = { ...source } || { ...configSettings }
    }
    buildStageData()

    function resetStageData() {
      buildStageData()
    }

    // 从暂存区更新设置
    function updateSettingsFromStageData() {
      const originThemePrimaryColor = baseSettings.data?.themePrimaryColor
        || configSettings.themePrimaryColor

      const source = { ...baseSettings.stage } as ConfigSettingObject
      baseSettings.data = { ...source } || { ...configSettings }

      // 如果主题主要色调发生改变，替换主色调
      if (originThemePrimaryColor !== baseSettings.data.themePrimaryColor)
        changeThemePrimaryColor(baseSettings.data?.themePrimaryColor)

      if (cacheAppSettings)
        cacheSettingsOnStorage({ ...baseSettings.data })
    }

    // 菜单是否折叠
    const { bool: menuCollapsed, toggleBool: toggleMenuCollapsed } = useBoolean(false)

    return {
      settings,
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
