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

const renderIcon = (icon: Component) => () => h(NIcon, null, {
  default: () => h(icon),
})

export const contextMenuOptions = [
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

export type OptionKeyType = 'refresh' | 'closeLeft' | 'closeRight' | 'closeOthers'

export function disableContextMenuOption({
  key,
  index,
  length,
}: {
  key: OptionKeyType
  index: number
  length: number
}) {
  return [
    false,
    !(length > 1 && index > 0),
    !(length > 1 && index < length - 1),
    length <= 1,
  ][[
    'refresh',
    'closeLeft',
    'closeRight',
    'closeOthers',
  ].findIndex(i => i === key)]
}

export function handleOptionEvent({
  key,
  index,
  router,
}: {
  key: OptionKeyType
  index: number
  router: Router
}) {
  const tabStore = useTabStore()
  const handleRefresh = () => { // 刷新
    const currentTab = tabStore.tabs[index]
    if (!currentTab) return
    nextTick(() => {
      router.replace({
        path: `/redirect${currentTab.path}`,
      })
    })
  }
  const handleCloseLeft = () => { // 关闭左边
    const currentTab = tabStore.tabs[index]
    if (!currentTab) return
    tabStore
      .removeListTabs(tabStore.tabs.slice(0, index))
      .then(() => router.push(currentTab.path))
  }
  const handleCloseRight = () => { // 关闭右边
    const currentTab = tabStore.tabs[index]
    if (!currentTab) return
    tabStore
      .removeListTabs(tabStore.tabs.slice(index + 1))
      .then(() => router.push(currentTab.path))
  }
  const handleCloseOthers = () => { // 关闭其他
    const currentTab = tabStore.tabs[index]
    if (!currentTab) return
    tabStore
      .removeOtherTabs(currentTab)
      .then(() => router.push(currentTab.path))
  }
  ;[
    handleRefresh,
    handleCloseLeft,
    handleCloseRight,
    handleCloseOthers,
  ][[
    'refresh',
    'closeLeft',
    'closeRight',
    'closeOthers',
  ].findIndex(i => i === key)]()
}
