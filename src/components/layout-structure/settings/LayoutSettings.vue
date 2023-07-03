<script setup lang="ts">
import { LAYOUT_PARAMS as params } from '~/constants'

const message = useMessage()
const uiStore = useUiStore()
let showSettingsDrawer = $ref(false)

function saveCurrentSettings() {
  const loading = message.loading('正在更新配置')
  useTimeoutFn(() => {
    uiStore.applyCopySettings()
    loading.destroy()
    message.success('应用成功')
    showSettingsDrawer = false
  }, 500)
}
</script>

<template>
  <div
    fixed z-1000
    :style="{
      right: `${params.settingsButtonRight}px`,
      bottom: `${params.settingsButtonBottom}px`,
    }"
  >
    <n-popover placement="top" trigger="hover">
      <template #trigger>
        <button i-carbon-settings text-lg hover:animate-spin icon-btn @click="showSettingsDrawer = true" />
      </template>
      主题设置
    </n-popover>
  </div>

  <n-drawer v-model:show="showSettingsDrawer" :width="params.settingsDrawerWidth">
    <n-drawer-content closable :native-scrollbar="false">
      <template #header>
        主题配置
      </template>

      <LayoutSettingsContent />

      <template #footer>
        <n-space vertical w-full>
          <n-button type="primary" block @click="saveCurrentSettings">
            应用当前配置
          </n-button>
          <n-button type="warning" block @click="uiStore.resetCopySettings">
            重置当前配置
          </n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
