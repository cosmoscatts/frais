/**
 * 退出登录时，清楚 `store` 中的内容
 */
export function useLogout() {
  const { removeUser } = useUserStore()
  const { removeAllTabs } = useTabStore()
  const { removeAppMenus } = usePermissionStore()
  const actions = [removeUser, removeAllTabs, removeAppMenus]

  actions.forEach((removeEffect) => {
    removeEffect()
  })
}
