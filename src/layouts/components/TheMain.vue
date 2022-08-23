<script setup lang="ts">
const appStore = useAppStore()
const animateName = computed(() => {
  return appStore.settings.data?.showTransitionAnimation
    ? appStore.settings.data?.transitionAnimation
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
