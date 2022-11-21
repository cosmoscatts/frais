import {
  BookOutline as BookIcon,
  StatsChartOutline as ChartIcon,
  BoatOutline as DeskTopIcon,
  DocumentTextOutline as MarkdownIcon,
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
  markdown: markRaw(MarkdownIcon),
  chart: markRaw(ChartIcon),
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
  {
    id: 103,
    label: 'Markdown 示例',
    icon: 'markdown',
    path: '/markdown',
  },
  {
    id: 104,
    label: 'Chart 示例',
    icon: 'chart',
    path: '/charts',
  },
]
