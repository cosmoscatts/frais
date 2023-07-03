<script setup lang="ts">
const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <button
    text-lg
    icon-btn
    :class="isFullscreen
      ? 'i-ri-fullscreen-exit-line'
      : 'i-ri-fullscreen-line'"
    @click="toggle"
  />
</template>
