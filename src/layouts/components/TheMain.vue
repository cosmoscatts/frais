<script setup lang="ts">
// TODO 缓存页面
const { baseSettings } = storeToRefs(useAppStore())
const animateName = computed(() => {
  return baseSettings.value?.showTransitionAnimation
    ? baseSettings.value.transitionAnimation
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
