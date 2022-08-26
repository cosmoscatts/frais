<script setup lang="ts">
import type { Component } from 'vue'
import { NEllipsis, NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
} from '@vicons/ionicons5'
import { defaultMenus } from '~/config'
import type { Menu } from '~/types'

const appStore = useAppStore()
const { menuCollapsed, baseSettings } = storeToRefs(appStore)

// 渲染图标
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

// 渲染可省略的菜单名称
function renderLabel(label: string) {
  return () => h(NEllipsis, null, { default: () => label })
}

// 储存 icon 字段对应的图标组件
const iconMap: { [key: string]: Component } = {
  user: PersonIcon,
  home: BookIcon,
}

// 将菜单项转换成 `NMenu` 组件需要的格式
function generateMenuOption(menuItem: Menu): MenuOption {
  return {
    label: renderLabel(menuItem.label),
    key: menuItem.id,
    icon: menuItem.icon && iconMap[menuItem.icon]
      ? renderIcon(iconMap[menuItem.icon])
      : undefined,
    children: menuItem.children?.map((child: Menu) => generateMenuOption(child)) || undefined,
  }
}

const menuOptions = computed<MenuOption[]>(() => {
  return defaultMenus.map(i => generateMenuOption(i)) || []
})
console.log('menu created')
console.log(menuOptions.value)
</script>

<template>
  <n-menu
    :inverted="baseSettings.invertMenu"
    :collapsed="menuCollapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
    default-expand-all
  />
</template>
