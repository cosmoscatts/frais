<script setup lang="ts">
import BaseLayoutVertical from './BaseLayoutVertical.vue'
import BaseLayoutHorizontal from './BaseLayoutHorizontal.vue'

const { settings } = storeToRefs(useAppStore())
const component = computed(() => {
  return settings.value?.layout === 'vertical'
    ? BaseLayoutVertical
    : BaseLayoutHorizontal
})
</script>

<template>
  <Component :is="component" />
</template>
