import { baseSettingVars } from '~/config'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const { themeMode, ...restVars } = baseSettingVars
    const darkValue = themeMode === 'system'
      ? ''
      : ''
    // the app theme mode
    const {
      bool: isDark,
      setBool: toggleDark,
    } = useBoolean()

    // menu collapse state
    const {
      bool: menuCollapse,
      setBool: toggleMenuCollapse,
    } = useBoolean()

    return {
      isDark,
      menuCollapse,
      toggleDark,
      toggleMenuCollapse,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
