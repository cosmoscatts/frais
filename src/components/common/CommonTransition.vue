<script setup lang="ts">
const uiStore = useUiStore()
const animateName = computed(() => {
  return uiStore.settings.showAnimation
    ? uiStore.settings.animationMode
    : undefined
})
</script>

<template>
  <Transition :name="animateName" mode="out-in" appear>
    <slot />
  </Transition>
</template>
