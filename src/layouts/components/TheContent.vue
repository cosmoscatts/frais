<script setup lang="ts">
const uiStore = useUiStore()
const tabStore = useTabStore()
const animationMode = computed(() => {
  return uiStore.settings.showAnimation
    ? uiStore.settings.animationMode
    : undefined
})
</script>

<template>
  <div>
    <PageHeader mb10px />
    <RouterView v-slot="{ Component, route }">
      <Transition :name="animationMode" mode="out-in" appear>
        <KeepAlive :include="tabStore.cachedTabNames" :max="10">
          <component :is="Component" :key="route.path" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
</template>
