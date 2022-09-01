<script setup lang="ts">
const {
  type = 'add',
  modalVisible = false,
} = defineProps<{
  /** 表单操作类型 */
  type?: 'add' | 'edit'
  /** 表单是否显示 */
  modalVisible?: boolean
}>()

const emits = defineEmits(['update:modal-visible', 'saveRoleData'])

const title = computed(() => type === 'add' ? '新增角色' : '编辑角色')

const segmented = {
  content: 'soft',
  footer: 'soft',
} as const

function onCloseModal() {
  emits('update:modal-visible', false)
}
</script>

<template>
  <n-modal
    :show="modalVisible"
    :title="title" size="huge"
    style="width: 650px;"
    preset="card" :bordered="false"
    :segmented="segmented"
    :mask-closable="false"
    transform-origin="center"
    :on-esc="onCloseModal"
    :on-close="onCloseModal"
  >
    内容
    <template #footer>
      <div flex-center gap-x-5>
        <n-button type="primary">
          <span text-white font-bold>保存</span>
        </n-button>
        <n-button type="error">
          <span text-white font-bold>取消</span>
        </n-button>
      </div>
    </template>
  </n-modal>
</template>
