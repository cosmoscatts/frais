<script setup lang="ts">
import { ColorPaletteOutline } from '@vicons/ionicons5'
import SettingsDrawer from './settings-drawer/index.vue'
import { APP_LAYOUT_PARAMS } from '~/config'

const {
  settingsDrawerRight,
  settingsDrawerBottom,
  settingsDrawerWidth,
} = APP_LAYOUT_PARAMS
const LOADING_INTERVAL = 1000

const uiStore = useUiStore()
let showSettingsDrawer = $ref(false)

function saveCurrentSettings() {
  $message.loading('正在更新配置')
  useTimeoutFn(() => {
    uiStore.applyCopySettings()
    $message.destroyAll()
    $message.success('应用成功')
    showSettingsDrawer = false
  }, LOADING_INTERVAL)
}
</script>

<template>
  <div
    fixed z-1000
    :style="{
      right: `${settingsDrawerRight}px`,
      bottom: `${settingsDrawerBottom}px`,
    }"
  >
    <n-button
      ref="refButton"
      type="primary"
      size="large"
      text-color="white"
      @click="showSettingsDrawer = true"
    >
      <template #icon>
        <n-icon :size="24" :component="ColorPaletteOutline" />
      </template>
    </n-button>
  </div>

  <n-drawer v-model:show="showSettingsDrawer" :width="settingsDrawerWidth">
    <n-drawer-content closable :native-scrollbar="false">
      <template #header>
        主题配置
      </template>

      <SettingsDrawer v-if="showSettingsDrawer" />

      <template #footer>
        <n-space vertical w-full>
          <n-button type="primary" block @click="saveCurrentSettings">
            <span text="dark dark:white" font-bold>应用当前配置</span>
          </n-button>
          <n-button type="warning" block @click="uiStore.resetCopySettings">
            <span text="dark dark:white" font-bold>重置当前配置</span>
          </n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
