<script  setup lang="ts">
import {
  TheFoot,
  TheMain,
  TheNav,
  TheSettings,
  TheSide,
  TheTabs,
} from '../components'
import { appLayoutParams, showAppSettings } from '~/config'

const appStore = useAppStore()
const { menuCollapsed, baseSettings } = storeToRefs(appStore)
const { setMenuCollapsed, setMenuUnCollapsed } = appStore

const {
  navHeight,
  tabHeight,
  sideWidth,
  sideCollapsedWidth,
  contentPadding,
  footHeight,
  backTopRight,
  backTopBottom,
  backTopvisibilityHeight,
} = appLayoutParams

// 计算内容区域需要减去的高度值
const diffHeight = computed(() => {
  let height = navHeight
  if (baseSettings.value.showTabs)
    height += tabHeight
  // `border` 边框的高度也需要考虑
  return height + 1
})

// 设置 `backTop` 的监听目标
// `fixNav = true` 即固定页头时，`target` 为 `refContentWrapper`
// 否则为 `refMainWrapper`
const refMainWrapper = ref()
const refContentWrapper = ref()
</script>

<template>
  <n-layout has-sider hw-screen of-hidden>
    <n-layout-sider
      bordered position="absolute"
      :inverted="baseSettings.invertMenu"
      :show-trigger="baseSettings.sideCollapsedTriggerStyle"
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
      ref="refMainWrapper" of="x-hidden y-auto"
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
        ref="refContentWrapper" ha
        :position="baseSettings.fixNav ? 'absolute' : 'static'"
        :style="{
          marginTop: `${
            !baseSettings.fixNav
              ? 0
              : baseSettings.showTabs
                ? navHeight + tabHeight + 1
                : navHeight + 1
          }px`,
          minHeight: `calc(100% - ${diffHeight}px)`,
        }"
        :native-scrollbar="false"
      >
        <n-layout-content>
          <TheMain ha :style="{ padding: `${contentPadding}px`, minHeight: `calc(100vh - ${diffHeight + footHeight + 1}px)` }" />
        </n-layout-content>
        <n-layout-footer v-if="baseSettings.showFoot" :style="{ height: `${footHeight}px` }" bordered>
          <TheFoot hw-full />
        </n-layout-footer>
        <n-back-top
          :listen-to="refContentWrapper"
          :right="backTopRight"
          :bottom="backTopBottom"
          :visibility-height="backTopvisibilityHeight"
        />
      </n-layout>
      <n-back-top
        :listen-to="refMainWrapper"
        :right="backTopRight"
        :bottom="backTopBottom"
        :visibility-height="backTopvisibilityHeight"
      />
    </n-layout>
    <TheSettings v-if="showAppSettings" />
  </n-layout>
</template>
