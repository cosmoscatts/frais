<script setup lang="ts">
const {
  show = false,
  loading = false,
  title = '',
  style = {},
  handleOk = noop,
  onClose = noop,
} = defineProps<{
  show?: boolean
  loading?: boolean
  title?: string
  style?: {}
  handleOk?: () => void
  onClose?: () => void
}>()
</script>

<template>
  <n-modal
    :show="show"
    size="huge"
    preset="card"
    transform-origin="center"
    :title="title"
    :style="{ width: '650px', ...style }"
    :bordered="false"
    :segmented="{
      content: 'soft',
      footer: 'soft',
    }"
    :mask-closable="false"
    :on-esc="onClose"
    :on-close="onClose"
  >
    <slot />
    <template #footer>
      <div flex-center gap-x-5>
        <n-button type="primary" :loading="loading" text-color="white" strong @click="handleOk">
          <span font-bold>保存</span>
        </n-button>
        <n-button type="error" text-color="white" strong @click="onClose">
          <span font-bold>取消</span>
        </n-button>
      </div>
    </template>
  </n-modal>
</template>
