<script setup lang="ts">
defineOptions({ inheritAttrs: true })

const refEl = ref()
const isHovered = useElementHover(refEl)

const message = useMessage()
function onClick() {
  message.warning('暂不支持')
}
</script>

<template>
  <button ref="refEl" class="social-button" hover="bg-#EEEEEE dark:bg-#212125" mt10px @click="onClick">
    <slot />
    <div v-if="isHovered" i-carbon-arrow-right absolute right-10px />
  </button>
</template>

<style scoped>
.social-button {
  position: relative;
  height: 28px;
  border: 1px solid var(--n-border-color);
  border-radius: 5px;
  overflow: hidden;
  display: inline-flex;
  flex-grow: 1;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 1.5;
  font-size: 13px;
  width: 100%;
  align-items: center;
}
</style>
