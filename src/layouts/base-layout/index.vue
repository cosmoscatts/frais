<script setup lang="ts">
import BaseLayoutVertical from './BaseLayoutVertical.vue'
import BaseLayoutHorizontal from './BaseLayoutHorizontal.vue'

const { baseSettings } = storeToRefs(useAppStore())
console.log('layout', baseSettings.value)
const component = computed(() => {
  return baseSettings.value?.layout === 'vertical'
    ? BaseLayoutVertical
    : BaseLayoutHorizontal
})
</script>

<template>
  <Component :is="component" />
</template>
