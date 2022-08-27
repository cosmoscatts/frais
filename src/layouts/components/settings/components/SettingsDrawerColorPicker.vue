<script setup lang="ts">
import ColorCheckbox from './SettingsDrawerColorCheckBox.vue'

const {
  modelValue,
  options = [],
} = defineProps<{
  modelValue: string
  options: {
    label: string
    value: string
  }[]
}>()

const emits = defineEmits(['update:model-value'])

function onUpdateValue(value: string) {
  emits('update:model-value', value)
}
</script>

<template>
  <div>
    <n-grid :cols="8" :x-gap="8" :y-gap="12">
      <n-grid-item v-for="color in theme.themeColorList" :key="color" class="flex-x-center">
        <ColorCheckbox :color="color" :checked="color === theme.themeColor" @click="theme.setThemeColor(color)" />
      </n-grid-item>
    </n-grid>
    <n-space vertical class="pt-12px">
      <n-color-picker :value="modelValue" show-alpha @update-value="onUpdateValue" />
      <n-button block :type="otherColorBtnType" @click="openModal">
        更多颜色
      </n-button>
    </n-space>

    <n-modal :show="visible" preset="card" class="w-640px h-480px" :z-index="10001" @close="handleClose">
      <div class="flex-x-center">
        <n-gradient-text type="primary" :size="24">
          中国传统颜色
        </n-gradient-text>
      </div>
      <n-tabs>
        <n-tab-pane v-for="item in traditionColors" :key="item.label" :name="item.label" :tab="item.label">
          <n-grid :cols="8" :x-gap="16" :y-gap="8">
            <n-grid-item v-for="i in item.data" :key="i.label">
              <ColorCheckbox
                class="!w-full !h-36px !rounded-4px"
                :color="i.color"
                :checked="i.color === theme.themeColor"
                icon-class="text-20px"
                @click="theme.setThemeColor(i.color)"
              />
              <p class="text-center">
                {{ i.label }}
              </p>
            </n-grid-item>
          </n-grid>
        </n-tab-pane>
      </n-tabs>
    </n-modal>
  </div>
</template>
