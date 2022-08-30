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
import type { Router } from 'vue-router'

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
    closeLeft: () => {
      return !(tabsLength > 1 && tabIdx > 0)
    },
    closeRight: () => {
      return !(tabsLength > 1 && tabIdx < tabsLength - 1)
    },
    closeOthers: () => {
      return tabsLength <= 1
    },
  }
  return actionMap[key]() || false
}

/**
 * 处理 `tab` 右键菜单选项点击事件
 */
export function handleTabContextMenuOptionFn({
  tabIdx,
  optionKey,
  router,
}: {
  tabIdx: number
  optionKey: TabContextMenuOptionKeyType
  router: Router
}) {
  const { removeTabsByList, removerOtherTabs, visitedTabs: tabs } = useTabStore()

  /**
   * 处理刷新事件
   */
  const handleRefresh = () => {
    const currentTab = tabs[tabIdx]
    if (!currentTab)
      return
    const { path } = currentTab
    nextTick(() => {
      router.replace({
        path: `/redirect${path}`,
      })
    })
  }

  /**
   * 处理关闭左边事件
   */
  const handleCloseLeft = () => {
    const currentTab = tabs[tabIdx]
    if (!currentTab)
      return
    const { path } = currentTab
    router.push(path)
    removeTabsByList(tabs.slice(0, tabIdx) || [])
  }

  /**
   * 处理关闭右边事件
   */
  const handleCloseRight = () => {
    const currentTab = tabs[tabIdx]
    if (!currentTab)
      return
    const { path } = currentTab
    router.push(path)
    removeTabsByList(tabs.slice(tabIdx + 1) || [])
  }

  /**
   * 处理关闭其他事件
   */
  const handleCloseOthers = () => {
    const currentTab = tabs[tabIdx]
    if (!currentTab)
      return
    const { path } = currentTab
    router.push(path)
    removerOtherTabs(currentTab)
  }

  const actionMap: Record<TabContextMenuOptionKeyType, Function> = {
    refresh: handleRefresh,
    closeLeft: handleCloseLeft,
    closeRight: handleCloseRight,
    closeOthers: handleCloseOthers,
  }

  actionMap[optionKey]()
}
