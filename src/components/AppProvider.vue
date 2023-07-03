<script setup lang="ts">
defineOptions({ name: 'NProvider' })

/**
 * 全局注册，以便在 <setup> 之外通过 window 调用
 */
function registerNaiveTools() {
  window.$loadingBar = useLoadingBar()
  window.$dialog = useDialog()
  window.$message = useMessage()
  window.$notification = useNotification()
}

const AppProviderContent = defineComponent({
  name: 'NaiveProviderContent',
  setup() {
    registerNaiveTools()
  },
  render() {
    return h('div')
  },
})
</script>

<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <slot />
          <AppProviderContent />
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>
