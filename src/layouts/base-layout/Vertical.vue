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

const appStore = useAppStore()
const { menuCollapsed, baseSettings } = storeToRefs(appStore)
const { setMenuCollapsed, setMenuUnCollapsed } = appStore

const {
  navHeight,
  tabHeight,
  sideWidth,
  sideCollapsedWidth,
  footHeight,
  backTopRight,
  backTopBottom,
} = appLayoutParams

// 计算内容区域需要减去的高度值
const diffheight = computed(() => {
  let height = navHeight
  if (baseSettings.value.showTabs)
    height += tabHeight
  // border 边框的高度也需要考虑
  return height + 1
})

// 设置 backTop 的监听目标
const refMainWrapper = ref()
const refContentWrapper = ref()
const backTopTarget = computed(() => {
  return baseSettings.value.fixNav
    ? refContentWrapper.value
    : refMainWrapper.value
})
</script>

<template>
  <n-layout has-sider h-screen w-screen :native-scrollbar="false">
    <n-layout-sider
      bordered :position="baseSettings.fixNav ? 'absolute' : 'static'"
      show-trigger="bar"
      collapse-mode="width"
      :collapsed="menuCollapsed"
      :width="sideWidth"
      :collapsed-width="sideCollapsedWidth"
      :native-scrollbar="false"
      @collapse="setMenuCollapsed"
      @expand="setMenuUnCollapsed"
    >
      <TheSide />
    </n-layout-sider>
    <n-layout
      ref="refMainWrapper"
      :position="baseSettings.fixNav ? 'absolute' : 'static'"
      :style="{
        width: `calc(100% - ${menuCollapsed ? sideCollapsedWidth : sideWidth})px`,
        left: `${baseSettings.fixNav
          ? menuCollapsed
            ? sideCollapsedWidth
            : sideWidth
          : 0}px`,
      }"
    >
      <n-layout-header bordered :position="baseSettings.fixNav ? 'absolute' : 'static'">
        <TheNav w-full bg-transparent :style="{ height: `${navHeight}px` }" />
        <TheTabs v-show="baseSettings.showTabs" w-full bg-transparent :style="{ height: `${tabHeight}px` }" />
      </n-layout-header>
      <n-layout
        ref="refContentWrapper"
        :position="baseSettings.fixNav ? 'absolute' : 'static'"
        :style="{
          marginTop: `${
            !baseSettings.fixNav
              ? 0
              : baseSettings.showTabs
                ? navHeight + tabHeight + 1
                : navHeight + 1
          }px`,
          minHeight: `calc(100% - ${diffheight}px)`,
        }"
        :native-scrollbar="false"
      >
        <n-layout-content>
          <TheMain />
          <div h-1000px />
        </n-layout-content>
        <n-layout-footer v-if="baseSettings.showFoot" :style="{ height: `${footHeight}px` }" bordered>
          <TheFoot h-full w-full />
        </n-layout-footer>
      </n-layout>
      <n-back-top :listen-to="backTopTarget" :right="backTopRight" :bottom="backTopBottom" />
    </n-layout>
  </n-layout>
</template>
