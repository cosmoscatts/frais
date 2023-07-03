<script setup lang="ts">
const uiStore = useUiStore()
</script>

<template>
  <LayoutVertical v-if="uiStore.settings.layout === 'vertical'" />
  <LayoutVerticalMix v-if="uiStore.settings.layout === 'vertical-mix'" />
  <LayoutHorizontal v-if="uiStore.settings.layout === 'horizontal'" />
  <LayoutHorizontalMix v-if="uiStore.settings.layout === 'horizontal-mix'" />
</template>
