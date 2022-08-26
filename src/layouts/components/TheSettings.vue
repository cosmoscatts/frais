<script setup lang="ts">
import { vElementHover } from '@vueuse/components'
import { ColorPaletteOutline } from '@vicons/ionicons5'
import { appLayoutParams } from '~/config'

const {
  settingsDrawerRight,
  settingsDrawerBottom,
  settingsDrawerWidth,
} = appLayoutParams

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
    <n-drawer-content>
      <template #header>
        主题配置
      </template>
      <template #footer>
        <n-space vertical w-full>
          <n-button type="primary" block text-white>
            应用当前配置
          </n-button>
          <n-button type="warning" block text-white>
            重置当前配置
          </n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
