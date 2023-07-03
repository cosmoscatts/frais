import type { Menu } from '~/types'

export const MENUS: Menu[] = [
  {
    id: 101,
    label: '首页',
    icon: 'home',
    path: '/dashboard',
  },
  {
    id: 102,
    label: '系统管理',
    icon: 'system',
    children: [
      {
        id: 10201,
        label: '用户管理',
        icon: 'user',
        path: '/system/user',
      },
      {
        id: 10202,
        label: '角色管理',
        icon: 'role',
        path: '/system/role',
      },
    ],
  },
]
