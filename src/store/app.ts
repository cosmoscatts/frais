import { cacheAppSettings, configSettings } from '~/config'

export const useAppStore = defineStore(
  'appStore',
  () => {
    // 菜单是否折叠
    const { bool: menuCollapsed, toggleBool: toggleMenuCollapsed } = useBoolean(false)

    return {
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
