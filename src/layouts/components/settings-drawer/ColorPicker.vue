<script setup lang="ts">
import ColorCheckbox from './ColorPickerCheckbox.vue'
import { COMMON_COLORS, TRADITIONAL_COLORS } from '~/config'

const {
  modelValue,
} = defineProps<{
  modelValue: string
}>()

const emits = defineEmits(['update:model-value'])

function onUpdateValue(value: string) {
  emits('update:model-value', value)
}

// 是否显示传统颜色
const showTraditionalColors = $ref(false)
</script>

<template>
  <div>
    <n-grid :cols="8" :x-gap="8" :y-gap="12">
      <n-grid-item v-for="color in COMMON_COLORS" :key="color" flex-x-center>
        <ColorCheckbox :color="color" :checked="color === modelValue" @click="onUpdateValue(color)" />
      </n-grid-item>
    </n-grid>
    <n-space vertical pt-12px>
      <n-color-picker :value="modelValue" show-alpha @update-value="onUpdateValue" />
      <n-button block strong ghost type="primary" @click="showTraditionalColors = true">
        更多颜色
      </n-button>
    </n-space>

    <n-modal
      :show="showTraditionalColors" preset="card"
      style="width: 640px; height: 480px;" :z-index="10001"
      @esc="showTraditionalColors = false"
      @close="showTraditionalColors = false"
      @mask-click="showTraditionalColors = false"
    >
      <div class="flex-x-c">
        <n-gradient-text type="primary" :size="24">
          中国传统颜色
        </n-gradient-text>
      </div>
      <n-tabs>
        <n-tab-pane v-for="item in TRADITIONAL_COLORS" :key="item.label" :name="item.label" :tab="item.label">
          <n-grid :cols="8" :x-gap="16" :y-gap="8">
            <n-grid-item v-for="i in item.data" :key="i.label">
              <ColorCheckbox
                class="!w-full !h-36px !rounded-4px"
                :color="i.color" icon-class="text-20px"
                :checked="i.color === modelValue"
                @click="onUpdateValue(i.color)"
              />
              <p text-center>
                {{ i.label }}
              </p>
            </n-grid-item>
          </n-grid>
        </n-tab-pane>
      </n-tabs>
    </n-modal>
  </div>
</template>
