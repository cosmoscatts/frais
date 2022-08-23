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
  navHeight: { class: navHeightClass },
  tabHeight: { class: tabHeightClass },
  sideWidth: { value: sideWidthValue },
  sideCollapsedWidth: { value: sideCollapsedWidthValue },
  footHeight: { class: footHeightClass },
} = appLayoutParams

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
      :collapsed-width="sideCollapsedWidthValue"
      :width="sideWidthValue"
      @collapse="toggleMenuCollapsed"
      @expand="toggleMenuCollapsed"
    >
      <TheSide />
    </n-layout-sider>
    <n-layout>
      <n-layout-header>
        <TheNav w-full bg-transparent :class="navHeightClass" />
      </n-layout-header>
      <n-layout-content style="min-height: calc(100% - 114px)">
        <TheMain />
      </n-layout-content>
      <n-layout-footer v-if="baseSettings.showFoot" h-50px>
        <TheFoot :class="footHeightClass" />
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>
