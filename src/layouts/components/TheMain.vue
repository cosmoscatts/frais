<script setup lang="ts">
const { settings } = storeToRefs(useAppStore())
const animateName = computed(() => {
  return settings.value?.showTransitionAnimation
    ? settings.value.transitionAnimation
    : undefined
})
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition :name="animateName" mode="out-in" appear>
      <KeepAlive :include="[]">
        <component :is="Component" :key="route.fullPath" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>
