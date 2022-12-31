<script  setup lang="ts">
import { useThemeVars } from 'naive-ui'
import {
  TheFoot,
  TheMain,
  TheNav,
  TheSettings,
  TheSide,
  TheTabs,
} from '../components'
import { APP_LAYOUT_PARAMS, showAPP_SETTINGS } from '~/config'

const appStore = useAppStore()
const { isMobile, menuCollapsed, baseSettings } = storeToRefs(appStore)
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
} = APP_LAYOUT_PARAMS

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

// 计算 `MainWrapper` 宽度
const mainWrapperWidth = computed(() => {
  return isMobile.value
    ? '100%'
    : `calc(100% - ${menuCollapsed.value ? sideCollapsedWidth : sideWidth}px)`
})

// 计算 `MainWrapper` `left` 偏移
const mainWrapperLeft = computed(() => {
  return isMobile.value
    ? '0px'
    : `${menuCollapsed.value ? sideCollapsedWidth : sideWidth}px`
})

const themeVars = useThemeVars()
</script>

<template>
  <n-layout has-sider hw-screen of-hidden>
    <n-layout-sider
      v-if="!isMobile"
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
    <n-drawer
      v-else
      :style="{
        backgroundColor: themeVars.cardColor,
      }"
      :width="sideWidth"
      :auto-focus="false"
      :show="!menuCollapsed"
      placement="left"
      display-directive="show"
      @mask-click="setMenuCollapsed"
    >
      <TheSide />
    </n-drawer>

    <n-layout
      ref="refMainWrapper"
      of="x-hidden y-auto"
      position="absolute"
      :style="{
        width: mainWrapperWidth,
        left: mainWrapperLeft,
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
    <TheSettings v-if="showAPP_SETTINGS" />
  </n-layout>
</template>
