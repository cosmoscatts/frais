<script setup lang="ts">
import { SHOW_SETTINGS_BUTTON, LAYOUT_PARAMS as params } from '~/constants'

const uiStore = useUiStore()
const refFullWrapper = ref()
const refContentWrapper = ref()

const position = computed(() => uiStore.settings.fixNav ? 'absolute' : 'static')
const subtraction = getLayoutContentHeightSubtraction()
const { left, width } = getFullWrapperRect()
const contentWrapperStyle = getContentWrapperStyle()
const showPageHeader = computed(() => {
  return uiStore.settings.layout === 'horizontal' && uiStore.settings.showPageHeader
})
</script>

<template>
  <n-layout has-sider hw-screen of-hidden>
    <slot name="sider" />

    <n-layout
      id="full-wrapper"
      ref="refFullWrapper"
      position="absolute" h-full of="x-hidden y-auto"
      :style="{ width, left }"
      :class="!uiStore.settings.fixNav && 'scrollable'"
      :native-scrollbar="false"
    >
      <n-layout-header :position="position">
        <slot name="header" />
      </n-layout-header>
      <n-layout
        ref="refContentWrapper"
        :position="position"
        :style="contentWrapperStyle"
        :class="uiStore.settings.fixNav && 'scrollable'"
        :native-scrollbar="false"
      >
        <n-layout-content>
          <slot name="main">
            <LayoutContent ha :style="{ padding: `${params.contentPadding}px`, minHeight: `calc(100vh - ${subtraction + params.footHeight}px)` }">
              <template v-if="showPageHeader" #header>
                <LayoutPageHeader mb10px />
              </template>
            </LayoutContent>
          </slot>
        </n-layout-content>
        <n-layout-footer v-if="uiStore.settings.showFoot" :style="{ height: `${params.footHeight}px` }" bordered>
          <slot name="foot">
            <LayoutFooter hw-full />
          </slot>
        </n-layout-footer>
        <LayoutBackTop :el="refContentWrapper" />
      </n-layout>
      <LayoutBackTop :el="refFullWrapper" />
      <LayoutSettings v-if="SHOW_SETTINGS_BUTTON" />
    </n-layout>
  </n-layout>
</template>
