<script setup lang="ts">
import { APP_LAYOUT_PARAMS, APP_META } from '~/config'

const uiStore = useUiStore()
const show = computed(() => uiStore.settings.showLogo)
const collapsed = computed(() => uiStore.collaspeSide.get())
const isHorizontal = computed(() => uiStore.settings.layout === 'horizontal')
</script>

<template>
  <div
    v-if="show"
    flex-c
    :class="{ 'ml-4': isHorizontal }"
    :style="{ height: `${APP_LAYOUT_PARAMS.navHeight}px` }"
  >
    <div i-carbon-rocket text="primary 24px" />
    <span
      v-if="isPC && (isHorizontal || !collapsed)"
      font="bold sans" pl-16px text-16px
    >
      {{ APP_META.name }}
    </span>
  </div>
</template>
