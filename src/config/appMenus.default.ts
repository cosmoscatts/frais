import {
  BookOutline as BookIcon,
  DesktopOutline as DeskTopIcon,
  PersonOutline as PersonIcon,
} from '@vicons/ionicons5'
import type { Component } from 'vue'
import {
  NotepadPerson20Regular as NotepadPersonIcon,
} from '@vicons/fluent'
import type { Menu } from '~/types'

/**
 * 储存 `icon` 字段对应的图标组件
 */
export const defaultMenuIconMap: { [key: string]: Component } = {
  home: markRaw(BookIcon),
  system: markRaw(DeskTopIcon),
  user: markRaw(PersonIcon),
  role: markRaw(NotepadPersonIcon),
}

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
