import type { Menu } from '~/types'

/**
 * 默认菜单集合
 */
export const defaultMenus: Menu[] = [
  {
    id: 101,
    label: '首页',
    icon: 'home',
    path: '/dashboard',
  },
  {
    id: 102,
    label: '系统管理',
    icon: 'user',
    children: [
      {
        id: 10201,
        label: '用户管理',
        path: '/system/user',
      },
      {
        id: 10202,
        label: '角色管理',
        path: '/system/role',
      },
    ],
  },
]
