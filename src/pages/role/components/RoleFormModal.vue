<script setup lang="ts">
import type { TreeOption } from 'naive-ui'
import { TrashBinOutline as TrashBinOutlineIcon } from '@vicons/ionicons5'
import { renderTreeLabel, renderTreePrefix, rules } from '../form'
import type { Role } from '~/types'

type FormModel = Omit<Role, 'createTime' | 'updateTime'>

const { menuTreeData = [] } = defineProps<{ menuTreeData?: TreeOption[] }>()
const emits = defineEmits(['saveData'])

const segmented = {
  content: 'soft',
  footer: 'soft',
} as const

const baseFormModel: FormModel = {
  id: undefined,
  name: '',
  description: '',
  menuIdList: [],
}
const refForm = ref()
const form = useFormModal<FormModel, Role>(baseFormModel, refForm, emits)

watch(form.visible, form.openModalCb)

let hasCheckedAll = $ref(false) // 是否全选
const allMenuOptionsKeys = $computed(() => {
  const keys: number[] = []
  const dfs = (keys: number[], { key, children }: TreeOption) => {
    if (key) keys.push(Number(key))
    if (children?.length) children.forEach(i => dfs(keys, i))
  }
  menuTreeData.forEach(i => dfs(keys, i))
  return keys
})
const checkAllOrNot = () => {
  const length = form.formData.menuIdList?.length ?? 0
  hasCheckedAll = length > 0 && length === allMenuOptionsKeys.length
}
const handleCheckAll = () => {
  form.formData.menuIdList = hasCheckedAll
    ? allMenuOptionsKeys
    : []
}

watch(() => form.formData.menuIdList, checkAllOrNot)

defineExpose({ form })
</script>

<template>
  <n-modal
    :show="form.props.visible"
    :title="['新增角色', '编辑角色'][Number(form.props.type === 'edit')]"
    :bordered="false"
    :segmented="segmented"
    :mask-closable="false"
    size="huge"
    preset="card"
    transform-origin="center"
    style="width: 650px;"
    :on-esc="form.closeModal"
    :on-close="form.closeModal"
  >
    <n-form
      ref="refForm"
      :model="form.formData"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      :show-require-mark="false"
      :style="{
        maxWidth: '600px',
      }"
    >
      <n-form-item label="角色名称" path="name">
        <n-input v-model:value="form.formData.name" placeholder="请输入角色名称" clearable>
          <template #clear-icon>
            <n-icon :component="TrashBinOutlineIcon" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item label="角色描述" path="description">
        <n-input
          v-model:value="form.formData.description"
          placeholder="请输入角色描述" w-full
          type="textarea" clearable
          :autosize="{
            minRows: 3,
            maxRows: 5,
          }"
        >
          <template #clear-icon>
            <n-icon :component="TrashBinOutlineIcon" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item label="菜单权限" path="menuIdList">
        <div flex="~ col">
          <div flex justify-start ml-12px my-5px>
            <n-switch v-model:value="hasCheckedAll" size="large" @click="handleCheckAll">
              <template #icon>
                🛠
              </template>
              <template #checked>
                <span font-bold>全选</span>
              </template>
              <template #unchecked>
                <span font-bold>反选</span>
              </template>
            </n-switch>
          </div>
          <n-tree
            v-model:checked-keys="form.formData.menuIdList"
            block-line
            cascade
            checkable
            check-on-click
            default-expand-all
            :selectable="false"
            :render-label="renderTreeLabel"
            :render-prefix="renderTreePrefix"
            :data="menuTreeData"
          />
        </div>
      </n-form-item>
    </n-form>
    <template #footer>
      <div flex-c gap-x-5>
        <n-button type="primary" :loading="form.props.loading" text-color="white" @click="form.handleOk">
          <span font-bold>保存</span>
        </n-button>
        <n-button type="error" text-color="white" @click="form.closeModal">
          <span font-bold>取消</span>
        </n-button>
      </div>
    </template>
  </n-modal>
</template>
