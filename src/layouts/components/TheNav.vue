<script setup lang="ts">
import { Logo } from './logo'
import { Menu } from './menu'
import {
  NavAvatar,
  NavBell,
  NavBreadcrumb,
  NavCollapsedToggle,
  NavFullScreen,
  NavResponsivePanel,
} from './nav'
import { APP_META } from '~/config'

const { isMobile, baseSettings } = storeToRefs(useAppStore())

// 判断是否为垂直布局
const isVerticalLayout = computed(() => {
  return baseSettings.value?.layout === 'vertical'
})
</script>

<template>
  <div flex-center pr-5 border-b="1px solid [var(--n-border-color)]">
    <Logo v-if="!isVerticalLayout" />
    <NavCollapsedToggle v-if="isVerticalLayout && isMobile" ml-4 />
    <NavBreadcrumb v-if="isVerticalLayout" mx-4 />
    <Menu v-if="!isVerticalLayout && !isMobile" mx-4 />
    <div flex-auto />
    <div v-if="isVerticalLayout || !isMobile" flex-y-center>
      <a
        icon-btn text-lg i-carbon-logo-github mx-4
        :href="APP_META.github"
        target="_blank" title="GitHub"
      />
      <NavBell mr-4 />
      <NavFullScreen mr-4 />
      <DarkToggle mr-4 />
      <NavAvatar />
    </div>
    <NavResponsivePanel v-if="!isVerticalLayout && isMobile" />
  </div>
</template>
