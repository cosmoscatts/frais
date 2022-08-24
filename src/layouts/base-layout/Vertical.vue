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
  backTopvisibilityHeight,
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
  <n-layout has-sider h-screen w-screen of-hidden>
    <n-layout-sider
      bordered position="absolute"
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
      ref="refMainWrapper" of-auto
      position="absolute"
      :style="{
        width: `calc(100% - ${menuCollapsed ? sideCollapsedWidth : sideWidth})px`,
        left: `${menuCollapsed
          ? sideCollapsedWidth
          : sideWidth
        }px`,
      }"
      :native-scrollbar="false"
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
          <div h-1500px />
        </n-layout-content>
        <n-layout-footer v-if="baseSettings.showFoot" :style="{ height: `${footHeight}px` }" bordered>
          <TheFoot h-full w-full />
        </n-layout-footer>
        <n-back-top

          :to="backTopTarget"
          :right="backTopRight"
          :bottom="backTopBottom"
          :visibility-height="backTopvisibilityHeight"
        />
      </n-layout>
    </n-layout>
    <TheSettings />
  </n-layout>
</template>
