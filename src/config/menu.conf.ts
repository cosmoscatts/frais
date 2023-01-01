import type { Component } from 'vue'

import {
  PieChartOutline as ChartIcon,
  BookOutline as HomeIcon,
  BoatOutline as SystemIcon,
  PersonOutline as UserIcon,
} from '@vicons/ionicons5'

import {
  NotepadPerson20Regular as RoleIcon,
} from '@vicons/fluent'
import type { Menu } from '~/types'

type Source = 'front' | 'end'

interface MenuConfig {
  source: Source
  iconMap: { [key: string]: Component }
  defaultMenus: Menu[]
}

const iconMap: { [key: string]: Component } = {
  home: HomeIcon,
  system: SystemIcon,
  user: UserIcon,
  role: RoleIcon,
  chart: ChartIcon,
}

const defaultMenus: Menu[] = [
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
  {
    id: 103,
    label: 'Chart 示例',
    icon: 'chart',
    path: '/charts',
  },
]

export const APP_MENU: MenuConfig = {
  source: 'front',
  iconMap,
  defaultMenus,
}
