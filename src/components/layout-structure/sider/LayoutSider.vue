<script setup lang="ts">
import { LAYOUT_PARAMS as params } from '~/constants'

const { showLogo = true } = defineProps<{ showLogo?: boolean }>()
const uiStore = useUiStore()
</script>

<template>
  <n-layout-sider
    v-if="!isMobile"
    bordered position="absolute"
    :inverted="uiStore.settings.invertMenu"
    :show-trigger="uiStore.settings.sideCollapsedTriggerStyle"
    collapse-mode="width"
    :collapsed="uiStore.collapseSide.state"
    :width="params.sideWidth"
    :collapsed-width="params.sideCollapsedWidth"
    :native-scrollbar="false"
    @collapse="uiStore.collapseSide.collapse"
    @expand="uiStore.collapseSide.unCollapse"
  >
    <div flex="x-center col" of-hidden>
      <LayoutLogo v-if="showLogo" />
      <LayoutMenu mode="vertical" :style="{ height: `calc(100% - ${params.navHeight}px)` }" />
    </div>
  </n-layout-sider>
</template>
