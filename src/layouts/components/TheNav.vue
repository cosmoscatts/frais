<script setup lang="ts">
import { Logo } from './logo'
// import { Menu } from './menu'
import {
  NavAvatar,
  NavBell,
  NavBreadCrumb,
  NavFullScreen,
} from './nav'

// const { appMenus } = storeToRefs(usePermissionStore())
// const mode: 'vertical' | 'horizontal' | 'pop' | 'popButton' = 'horizontal'
const { baseSettings } = storeToRefs(useAppStore())
// 判断是否为垂直布局
const isVerticalLayout = computed(() => {
  return baseSettings.value?.layout === 'vertical'
})
const { width } = useWindowSize()
let shortLogo = $ref(false)
watchEffect(() => {
  if (!isVerticalLayout.value)
    shortLogo = width.value < 1200
})
</script>

<template>
  <div flex-center pr-5 shadow="sm light-900 dark:dark-700">
    <Logo v-if="!isVerticalLayout" :class="shortLogo ? 'w-64px' : 'w-200px'" />
    <NavBreadCrumb v-if="isVerticalLayout" mx-4 />
    <!-- <Menu v-if="!isVertical" :mode="mode" :metadata="appMenus" /> -->
    <div flex-auto />
    <div flex-y-center>
      <a
        icon-btn text-lg i-carbon-logo-github mx-4
        href="https://github.com/dud9/petite"
        target="_blank" title="GitHub"
      />
      <NavBell mr-4 />
      <NavFullScreen mr-4 />
      <DarkToggle mr-4 />
      <NavAvatar />
    </div>
  </div>
</template>
