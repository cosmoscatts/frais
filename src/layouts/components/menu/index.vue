<script setup lang="ts">
import type { Component } from 'vue'
import { NEllipsis, NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import type { Menu } from '~/types'
import { appLayoutParams } from '~/config'

const {
  sideCollapsedWidth,
  sideCollapsedIconSize,
} = appLayoutParams

const appStore = useAppStore()
const { menuCollapsed, baseSettings } = storeToRefs(appStore)
const permissionStore = usePermissionStore()
const { appMenus, menuIconMap } = storeToRefs(permissionStore)

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

// 将菜单项转换成 `<NMenu>` 组件需要的格式
function generateMenuOption(menuItem: Menu): MenuOption {
  const { value: iconMap } = menuIconMap
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
  const { value: menus } = appMenus
  return menus.map(i => generateMenuOption(i)) || []
})

const route = useRoute()
// 默认选中的 `menu option`
const defaultSelectedMenuOptionKey = computed(() => {
  const allMenuOptions = menuOptions.value.flatMap((i) => {
    return i.children
      ? [i, ...i.children]
      : [i]
  })
  return allMenuOptions.find(i => i.path === route.path)?.key || undefined
})
</script>

<template>
  <n-menu
    :mode="baseSettings.layout"
    :default-value="defaultSelectedMenuOptionKey"
    :inverted="baseSettings.invertMenu"
    :collapsed="menuCollapsed"
    :collapsed-width="sideCollapsedWidth"
    :collapsed-icon-size="sideCollapsedIconSize"
    :options="menuOptions"
    default-expand-all
  />
</template>
