<script setup lang="ts">
import { LAYOUT_PARAMS as params } from '~/constants'

const uiStore = useUiStore()
</script>

<template>
  <LayoutProvider>
    <template #sider>
      <LayoutSiderMix v-if="isPC" absolute left-0 top-0 z-30 />
    </template>
    <template #header>
      <LayoutNav w-full :style="{ height: `${params.navHeight}px` }" />
      <LayoutTabs v-show="uiStore.settings.showTabs" w-full :style="{ height: `${params.tabHeight}px` }" />
    </template>
  </LayoutProvider>
</template>
