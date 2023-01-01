<script setup lang="ts">
import {
  TheContent,
  TheFoot,
  TheNav,
  TheSettings,
  TheSide,
  TheTabs,
} from '../components'
import { APP_LAYOUT_PARAMS } from '~/config'

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

const uiStore = useUiStore()
const refMainWrapper = ref()
const refContentWrapper = ref()

const diffHeight = computed(() => {
  let height = navHeight
  if (uiStore.settings.showTabs) height += tabHeight
  return height + 1
})
const mainWrapperWidth = computed(() => {
  return isMobile.value
    ? '100%'
    : `calc(100% - ${uiStore.collaspeSide.get() ? sideCollapsedWidth : sideWidth}px)`
})
const mainWrapperLeft = computed(() => {
  return isMobile.value
    ? '0px'
    : `${uiStore.collaspeSide.get() ? sideCollapsedWidth : sideWidth}px`
})
</script>

<template>
  <n-layout has-sider hscreen wscreen of-hidden>
    <n-layout-sider
      v-if="!isMobile"
      bordered position="absolute"
      :inverted="uiStore.settings.invertMenu"
      :show-trigger="uiStore.settings.sideCollapsedTriggerStyle"
      collapse-mode="width"
      :collapsed="uiStore.collaspeSide.get()"
      :width="sideWidth"
      :collapsed-width="sideCollapsedWidth"
      :native-scrollbar="false"
      @collapse="uiStore.collaspeSide.collapse"
      @expand="uiStore.collaspeSide.unCollapse"
    >
      <TheSide />
    </n-layout-sider>

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
      <n-layout-header bordered :position="uiStore.settings.fixNav ? 'absolute' : 'static'">
        <TheNav w-full bg-transparent :style="{ height: `${navHeight}px` }" />
        <TheTabs v-show="uiStore.settings.showTabs" w-full bg-transparent :style="{ height: `${tabHeight}px` }" />
      </n-layout-header>
      <n-layout
        ref="refContentWrapper" ha
        :position="uiStore.settings.fixNav ? 'absolute' : 'static'"
        :style="{
          marginTop: `${
            !uiStore.settings.fixNav
              ? 0
              : uiStore.settings.showTabs
                ? navHeight + tabHeight + 1
                : navHeight + 1
          }px`,
          minHeight: `calc(100% - ${diffHeight}px)`,
        }"
        :native-scrollbar="false"
      >
        <n-layout-content>
          <TheContent ha :style="{ padding: `${contentPadding}px`, minHeight: `calc(100vh - ${diffHeight + footHeight + 1}px)` }" />
        </n-layout-content>
        <n-layout-footer v-if="uiStore.settings.showFoot" :style="{ height: `${footHeight}px` }" bordered>
          <TheFoot hfull wfull />
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
      <TheSettings v-if="uiStore.settings.showAppSettings" />
    </n-layout>
  </n-layout>
</template>
