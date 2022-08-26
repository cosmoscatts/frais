<script setup lang="ts">
import { appLayoutParams } from '~/config'

const { settingsDrawerRight, settingsDrawerBottom } = appLayoutParams

// 是否显示 `app` 设置抽屉
let showSettingsDrawer = $ref(false)

let isButtonHovered = $ref(false)
function onHover(state: boolean) {
  isButtonHovered = state
}

function onClick() {
  showSettingsDrawer = true
}
</script>

<template>
  <div>
    <n-button
      v-if="!showSettingsDrawer" v-element-hover="onHover"
      ghost :shape="isButtonHovered ? 'round' : 'circle'" size="large"
      fixed shadow-md :style="{ right: `${settingsDrawerRight}px`, bottom: `${settingsDrawerBottom}px` }"
      @click="onClick()"
    >
      1
      <!-- <IconSkin :stroke-width="6" /> -->
      <span v-if="isButtonHovered" ml-3>主题配置</span>
    </n-button>
    <n-drawer v-model:show="showSettingsDrawer" :width="502">
      <n-drawer-content>
        <template #header>
          主题配置
        </template>
        <template #footer>
          <n-space vertical>
            <n-button type="primary" block strong>
              应用当前配置
            </n-button>
            <n-button type="warning" block strong>
              重置当前配置
            </n-button>
          </n-space>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
