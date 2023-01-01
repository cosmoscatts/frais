<script setup lang="ts">
import { APP_LAYOUT_PARAMS, APP_META } from '~/config'
import logo from '~/assets/logo.svg'

const uiStore = useUiStore()
const collapsed = computed(() => uiStore.collaspeSide.get())
const isHorizontal = computed(() => uiStore.settings.layout === 'horizontal')
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
    <img :src="logo" h25px>
    <span v-if="isPC && (isHorizontal || !collapsed)" font="bold sans" ml3 text-20px>
      {{ APP_META.name }}
    </span>
  </div>
</template>
