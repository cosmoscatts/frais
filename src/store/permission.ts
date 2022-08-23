import type { Menu } from '~/types'
import { defaultMenus, menuSource } from '~/config'

export const permissionStore = defineStore(
  'permissionStore',
  () => {
    const appMenus = ref<Menu[]>([])

    /**
     * 获取菜单
     */
    function fetchAppMenus() {
      appMenus.value = menuSource === 'front'
        ? [...defaultMenus]
        : []
    }
    /**
     * 清空菜单
     */
    function removeAppMenus() {
      appMenus.value = []
    }

    return {
      appMenus,
      fetchAppMenus,
      removeAppMenus,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
