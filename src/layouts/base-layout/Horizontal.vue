<script  setup lang="ts">
import {
  TheContent,
  TheFoot,
  TheNav,
  TheTabs,
} from '../components'
import { APP_LAYOUT_PARAMS } from '~/config'

const uiStore = useUiStore()
const refMainWrapper = ref()
const refContentWrapper = ref()

const {
  navHeight,
  tabHeight,
  contentPadding,
  footHeight,
  backTopRight,
  backTopBottom,
  backTopvisibilityHeight,
} = APP_LAYOUT_PARAMS

const diffHeight = computed(() => {
  let height = navHeight
  if (uiStore.settings.showTabs) height += tabHeight
  return height + 1
})
</script>

<template>
  <n-layout ref="refMainWrapper" hscreen wscreen of-hidden :native-scrollbar="false">
    <n-layout-header bordered :position="uiStore.settings.fixNav ? 'absolute' : 'static'">
      <TheNav w-full :class="uiStore.settings.invertMenu && !isDark ? 'bg-[#001428] text-neutral' : 'bg-transparent'" :style="{ height: `${navHeight}px` }" />
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
        <TheContent ha :style="{ padding: `${contentPadding}px`, minHeight: `calc(100vh - ${diffHeight + footHeight + 1}px)` }">
          <PageHeader mb10px />
        </TheContent>
      </n-layout-content>
      <n-layout-footer v-if="uiStore.settings.showFoot" :style="{ height: `${footHeight}px` }" bordered>
        <TheFoot h-full w-full />
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
</template>
