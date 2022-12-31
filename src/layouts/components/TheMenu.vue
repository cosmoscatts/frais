<script setup lang="ts">
import type { Component } from 'vue'
import { NEllipsis, NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import type { Menu } from '~/types'
import { APP_LAYOUT_PARAMS, APP_MENU } from '~/config'

defineProps<{ mode?: 'vertical' | 'horizontal' }>()

const {
  sideCollapsedWidth,
  sideCollapsedIconSize,
} = APP_LAYOUT_PARAMS

const uiStore = useUiStore()
const authStore = useAuthStore()

const renderIcon = (icon: Component) => () => h(NIcon, null, { default: () => h(icon) })
const renderLabel = (label: string, path?: string) => (path
  ? () => h(
      RouterLink,
      {
        to: {
          path,
        },
      },
      { default: () => label },
    )
  : () => h(NEllipsis, null, { default: () => label })
)

function formatMenuOption(item: Menu): MenuOption {
  const { iconMap } = APP_MENU
  const { id, label, icon, path, children } = item
  return {
    key: id,
    label: renderLabel(label, path),
    path,
    icon: icon && iconMap[icon]
      ? renderIcon(iconMap[icon])
      : undefined,
    children: children?.map((child: Menu) => formatMenuOption(child)),
  }
}
const options = computed<MenuOption[]>(() => authStore.menus.map(i => formatMenuOption(i)))

const route = useRoute()
const selectedValues = computed(() => {
  const allOptions = options.value.flatMap((i) => {
    return i.children
      ? [i, ...i.children]
      : [i]
  })
  return allOptions.find(i => i.path === route.path)?.key
})
</script>

<template>
  <n-menu
    :mode="mode ?? uiStore.settings.layout"
    :value="selectedValues"
    :inverted="uiStore.settings.invertMenu"
    :collapsed="uiStore.collaspeSide.get()"
    :collapsed-width="sideCollapsedWidth"
    :collapsed-icon-size="sideCollapsedIconSize"
    :options="options"
    default-expand-all
  />
</template>
