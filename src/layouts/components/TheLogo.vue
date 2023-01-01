<script setup lang="ts">
import { APP_LAYOUT_PARAMS, APP_META } from '~/config'

const uiStore = useUiStore()
const collapsed = computed(() => uiStore.collaspeSide.get())
const isHorizontal = computed(() => uiStore.settings.layout === 'horizontal')

onMounted(() => useTimeoutFn(() => useLottie({
  containerId: '#lottie-logo',
  path: 'https://assets3.lottiefiles.com/packages/lf20_sfiiilbf.json',
}), 50))
</script>

<template>
  <div
    v-if="uiStore.settings.showLogo"
    flex-c
    :class="{ 'ml-4': isHorizontal }"
    :style="{
      height: `${APP_LAYOUT_PARAMS.navHeight}px`,
    }"
  >
    <div id="lottie-logo" h40px />
    <span v-if="isPC && (isHorizontal || !collapsed)" font="bold sans" ml4 text-20px>
      {{ APP_META.name }}
    </span>
  </div>
</template>
