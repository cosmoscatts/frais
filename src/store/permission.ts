import type { Menu } from '~/types'

export const permissionStore = defineStore(
  'permissionStore',
  () => {
    const appMenus = ref<Menu[]>([])

    /**
     * 清空菜单
     */
    function removeAppMenus() {
      appMenus.value = []
    }

    return {
      appMenus,
      removeAppMenus,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
