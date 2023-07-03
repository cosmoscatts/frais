<script setup lang="ts">
const uiStore = useUiStore()
const tabStore = useTabStore()
</script>

<template>
  <div>
    <slot name="header" />
    <RouterView v-slot="{ Component, route }">
      <CommonTransition>
        <KeepAlive :include="tabStore.cachedTabNames" :max="10">
          <component :is="Component" v-if="uiStore.reloadFlag" :key="route.name ?? route.path" />
        </KeepAlive>
      </CommonTransition>
    </RouterView>
  </div>
</template>
