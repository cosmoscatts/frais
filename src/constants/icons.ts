import IconHome from '~icons/carbon/home'
import IconSystem from '~icons/carbon/cloud-service-management'
import IconUser from '~icons/carbon/user'
import IconUserProfile from '~icons/carbon/user-profile'
import IconLogout from '~icons/carbon/logout'
import IconRole from '~icons/carbon/user-role'

export const ICONS: { [key: string]: Component } = {
  home: IconHome,
  system: IconSystem,
  role: IconRole,
  user: IconUser,
  profile: IconUserProfile,
  logout: IconLogout,
}

/**
 * 菜单是否有图标
 */
export function hasIcon(icon?: string) {
  if (!icon)
    return false
  return Object.keys(ICONS).includes(icon)
}

/**
 * 转换菜单图标
 */
export function formatIcon(icon: string) {
  return ICONS[icon]
}
