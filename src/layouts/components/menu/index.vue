<script setup lang="ts">
import type { Component } from 'vue'
import { NEllipsis, NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
} from '@vicons/ionicons5'
import { RouterLink } from 'vue-router'
import { defaultMenus } from '~/config'
import type { Menu } from '~/types'

const appStore = useAppStore()
const { menuCollapsed, baseSettings } = storeToRefs(appStore)

// 渲染图标
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

// 渲染 `RouterLink` & 可省略的菜单名称
function renderLabel(label: string, path?: string) {
  return path
    ? () =>
        h(
          RouterLink,
          {
            to: {
              path,
            },
          },
          { default: () => label },
        )
    : () => h(NEllipsis, null, { default: () => label })
}

// 储存 `icon` 字段对应的图标组件
const iconMap: { [key: string]: Component } = {
  user: PersonIcon,
  home: BookIcon,
}

// 将菜单项转换成 `<NMenu>` 组件需要的格式
function generateMenuOption(menuItem: Menu): MenuOption {
  const { id, label, icon, path, children } = menuItem
  return {
    key: id,
    label: renderLabel(label, path),
    icon: icon && iconMap[icon]
      ? renderIcon(iconMap[icon])
      : undefined,
    path,
    children: children?.map((child: Menu) => generateMenuOption(child)) || undefined,
  }
}

const menuOptions = computed<MenuOption[]>(() => {
  return defaultMenus.map(i => generateMenuOption(i)) || []
})

const route = useRoute()
// 默认选中的 `menu option`
const selectedMenuOptionKey = computed(() => {
  return menuOptions.value.find(i => i.path === route.path)?.key || undefined
})
</script>

<template>
  <n-menu
    :default-value="selectedMenuOptionKey"
    :inverted="baseSettings.invertMenu"
    :collapsed="menuCollapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
    default-expand-all
  />
</template>
