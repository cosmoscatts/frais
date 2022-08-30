import type { Component } from 'vue'
import { NIcon } from 'naive-ui'
import {
  CloseCircleOutline as CloseCircleOutlineIcon,
  Refresh as RefreshIcon,
} from '@vicons/ionicons5'
import {
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
} from '@vicons/carbon'

/**
 * 渲染图标
 */
const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    })
  }
}

/** 右键菜单项 */
export const baseTabContextMenuOptions = [
  {
    label: '刷新当前',
    key: 'refresh',
    icon: renderIcon(RefreshIcon),
  },
  {
    label: '关闭左边',
    key: 'closeLeft',
    icon: renderIcon(ArrowLeftIcon),
  },
  {
    label: '关闭右边',
    key: 'closeRight',
    icon: renderIcon(ArrowRightIcon),
  },
  {
    label: '关闭其他',
    key: 'closeOthers',
    icon: renderIcon(CloseCircleOutlineIcon),
  },
]

/** 定义右键菜单项 `key` 类型 */
export type TabContextMenuOptionKeyType = 'refresh' | 'closeLeft' | 'closeRight' | 'closeOthers'

export function isTabContextMenuOptionDisabled({
  key,
  tabIdx,
  tabsLength,
}: {
  key: TabContextMenuOptionKeyType
  tabIdx: number
  tabsLength: number
}) {
  const actionMap: Record<TabContextMenuOptionKeyType, Function> = {
    refresh: () => {
      return false
    },
    closeLeft: (tabIdx: number, tabsLength: number) => {
      return !(tabsLength > 1 && tabIdx > 0)
    },
    closeRight: (tabIdx: number, tabsLength: number) => {
      return !(tabsLength > 1 && tabIdx < tabsLength - 1)
    },
    closeOthers: (_tabIdx: number, tabsLength: number) => {
      return tabsLength <= 1
    },
  }
  return actionMap[key](tabIdx, tabsLength) || false
}
