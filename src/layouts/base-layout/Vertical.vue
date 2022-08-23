<script  setup lang="ts">
import {
  TheFoot,
  TheMain,
  TheNav,
  TheSettings,
  TheSide,
  TheTabs,
} from '../components'
import { appLayoutParams } from '~/config'

const {
  navHeight,
  tabHeight,
  sideWidth,
  sideCollapsedWidth,
  footHeight,
} = appLayoutParams
const height = computed(() => {
  return navHeight + footHeight
})

const appStore = useAppStore()
const { menuCollapsed, baseSettings } = storeToRefs(appStore)
const { toggleMenuCollapsed } = appStore
</script>

<template>
  <n-layout has-sider h-screen w-screen>
    <n-layout-sider
      :collapsed="menuCollapsed"
      show-trigger="bar"
      collapse-mode="width"
      :collapsed-width="sideCollapsedWidth"
      :width="sideWidth"
      @collapse="toggleMenuCollapsed"
      @expand="toggleMenuCollapsed"
    >
      <TheSide />
    </n-layout-sider>
    <n-layout>
      <n-layout-header :style="{ height: `${navHeight}px` }">
        <TheNav h-full w-full bg-transparent />
      </n-layout-header>
      <n-layout-content :style="{ minHeight: `calc(100% - ${height}px)` }">
        <TheMain />
      </n-layout-content>
      <n-layout-footer v-if="baseSettings.showFoot" :style="{ height: `${footHeight}px` }">
        <TheFoot h-full w-full />
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>
