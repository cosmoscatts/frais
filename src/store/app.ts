import type { GlobalThemeOverrides } from 'naive-ui'
import type { ConfigSettingObject } from '~/config'
import { cacheAppSettings, configSettings } from '~/config'
import { generatePrimaryColor, initAppSettings, setNaiveUiCommonColors } from '~/utils'

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
    // 需要覆盖的主题配置
    // 目前只覆盖主色调
    const themeOverrides = ref<GlobalThemeOverrides>()

    const changePrimaryColor = () => {
      // 根据主题主色调配置，生成颜色
      const primaryColorOverrides = generatePrimaryColor(baseSettings.value.themePrimaryColor)
      themeOverrides.value = {
        common: {
          ...primaryColorOverrides,
        },
        LoadingBar: {
          colorLoading: baseSettings.value.themePrimaryColor,
        },
      }
      // 将 naive ui 颜色写入 body
      setNaiveUiCommonColors(primaryColorOverrides)
    }

    const init = () => {
      // 如果开启了缓存配置, 则从 storage 更新配置
      if (cacheAppSettings)
        initStorage()

      baseSettings.value = {
        ...updateSettingsFromStorage({
          ...configSettings,
        }),
      }

      changePrimaryColor()
    }
    init()

    // 当亮、暗模式改变时，更新 body 中的颜色
    // 因为 naive ui 内置的颜色亮暗模式稍有区别
    watch(isDark, changePrimaryColor)

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
        changePrimaryColor()

      if (cacheAppSettings)
        cacheSettingsOnStorage({ ...baseSettings.value })
    }

    // 菜单是否折叠
    const { bool: menuCollapsed, setTrue: setMenuCollapsed, setFalse: setMenuUnCollapsed } = useBoolean(false)

    return {
      themeOverrides,
      baseSettings,
      stageSettings,
      resetStageData,
      updateSettingsFromStageData,
      menuCollapsed,
      setMenuCollapsed,
      setMenuUnCollapsed,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
