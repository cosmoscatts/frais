<script lang="ts" setup>
import IconLeft from '~icons/ph/caret-double-left-bold'
import IconRight from '~icons/ph/caret-double-right-bold'

const uiStore = useUiStore()
const icon = computed(() => {
  return uiStore.collapseSide.state
    ? IconRight
    : IconLeft
})
</script>

<template>
  <div h-50px flex-center>
    <n-button text :focusable="false" @click="uiStore.collapseSide.toggle">
      <n-icon :component="icon" :size="18" />
    </n-button>
  </div>
</template>
