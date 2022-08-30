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
  <div>
    <RouterView v-slot="{ Component, route }">
      <Transition :name="animateName" mode="out-in" appear>
        <KeepAlive :include="[]">
          <component :is="Component" :key="route.path" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
</template>
