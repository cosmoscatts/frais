<script setup lang="ts">
import { vElementHover } from '@vueuse/components'
import { ColorPaletteOutline } from '@vicons/ionicons5'
import SettingsDrawer from './settings/SettingsDrawer.vue'
import { appLayoutParams } from '~/config'

const {
  settingsDrawerRight,
  settingsDrawerBottom,
  settingsDrawerWidth,
} = appLayoutParams

const {
  updateSettingsFromStageData,
  resetStageData,
} = useAppStore()

// 是否显示 `app` 设置抽屉
let showSettingsDrawer = $ref(false)

let isButtonHovered = $ref(false)
function onHover(state: boolean) {
  isButtonHovered = state
}

function onClick() {
  isButtonHovered = false
  showSettingsDrawer = true
}

// 应用当前配置
function saveCurrentSettings() {
  const { message } = useGlobalNaiveApi()
  const LOADING_INTERVAL = 1000
  message.loading('正在更新配置')
  updateSettingsFromStageData()
  useTimeoutFn(() => {
    message.destroyAll()
    message.success('应用成功')
    showSettingsDrawer = false
  }, LOADING_INTERVAL)
}
</script>

<template>
  <div fixed :style="{ right: `${settingsDrawerRight}px`, bottom: `${settingsDrawerBottom}px` }" z-1000>
    <n-button
      v-if="!showSettingsDrawer" v-element-hover="onHover"
      tertiary size="large" type="primary"
      :circle="!isButtonHovered" :round="isButtonHovered"
      @click="onClick()"
    >
      <template #icon>
        <n-icon :size="24">
          <ColorPaletteOutline />
        </n-icon>
      </template>
      <span v-if="isButtonHovered" ml-3 font-bold>主题配置</span>
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
          <n-button type="warning" block @click="resetStageData">
            <span text="dark dark:white" font-bold>重置当前配置</span>
          </n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
