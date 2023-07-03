<script setup lang="ts">
import { LOGO, APP_META as meta, LAYOUT_PARAMS as params } from '~/constants'

const uiStore = useUiStore()
const isShort = $computed(() => {
  if (isMobile.value || uiStore.settings.layout === 'vertical-mix')
    return true
  if (uiStore.settings.layout === 'horizontal-mix')
    return false
  return uiStore.collapseSide.state
})
const avatarSize = computed(() => {
  if (uiStore.settings.layout === 'vertical-mix' && uiStore.collapseSide.state)
    return 28
  return 'large'
})
</script>

<template>
  <div
    v-if="uiStore.settings.showLogo" flex-center py-2px
    :style="{ height: `${params.navHeight}px` }"
  >
    <n-avatar
      :src="LOGO"
      :size="avatarSize"
      color="transparent"
      object-fit="cover"
    />
    <span v-if="!isShort" ml-6 text="primary 36px" font-bold>{{ meta.name }}</span>
  </div>
</template>
