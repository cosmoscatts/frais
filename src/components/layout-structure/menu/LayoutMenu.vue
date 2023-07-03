<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import type { Menu } from '~/types'
import { LAYOUT_PARAMS as params } from '~/constants'

const {
  mode,
  noCollapse = false,
  menuChildren = [],
  enablePropsMenu = false,
} = defineProps<{
  mode: 'vertical' | 'horizontal'
  noCollapse?: boolean
  menuChildren?: Menu[] // `vertical-mix` 菜单抽屉传递的子菜单组
  enablePropsMenu?: boolean
}>()

const uiStore = useUiStore()
const authStore = useAuthStore()
const route = useRoute()

const collapse = computed(() => {
  if (noCollapse)
    return false
  return uiStore.collapseSide.state
})

const options = computed<MenuOption[]>(() => {
  const menus = enablePropsMenu
    ? menuChildren
    : authStore.menus
  return menus.map(i => formatMenuOption(i))
})

const selectedKey = computed(() => {
  return getUserFlattenMenuTree()
    .find(item => item.path === route.path)?.id
})
</script>

<template>
  <n-menu
    :mode="mode ?? uiStore.settings.layout"
    :value="selectedKey"
    :inverted="uiStore.settings.invertMenu"
    :collapsed="collapse"
    :collapsed-width="params.sideCollapsedWidth"
    :collapsed-icon-size="params.sideMenuCollapsedIconSize"
    :options="options"
    default-expand-all
  />
</template>
