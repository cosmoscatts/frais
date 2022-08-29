import type { User } from '~/types'

/**
 * 查询用户的菜单，初始化 `tab`
 */
export async function createPermission(user: User) {
  const tabStore = useTabStore()
  const { updateUser } = useUserStore()
  const { fetchAppMenus } = usePermissionStore()

  updateUser(user)
  await fetchAppMenus()
  tabStore.initTabs(user.id)
}
