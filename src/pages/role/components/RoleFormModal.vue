<script setup lang="ts">
import type { FormValidationError, TreeOption } from 'naive-ui'
import { TrashBinOutline as TrashBinOutlineIcon } from '@vicons/ionicons5'
import { renderTreeLabel, renderTreePrefix, rules } from '../helper.form'
import type { Role } from '~/types'

const {
  type = 'add',
  modalVisible = false,
  form = {},
  menuTreeData = [],
} = defineProps<{
  /** 表单操作类型 */
  type?: 'add' | 'edit'
  /** 表单是否显示 */
  modalVisible?: boolean
  /** 表单数据 */
  form?: Role
  /** 菜单树数据 */
  menuTreeData?: TreeOption[]
}>()

const emits = defineEmits(['update:modal-visible', 'saveRoleData'])

// 标题
const title = computed(() => type === 'add' ? '新增角色' : '编辑角色')

// `card` 分级
const segmented = {
  content: 'soft',
  footer: 'soft',
} as const

// `form` 表单元素
const refForm = ref()

type FormModel = Omit<Role, 'createTime' | 'updateTime'>
const baseFormModel: FormModel = {
  id: undefined,
  name: '',
  description: '',
  menuIdList: [],
}
const formModel = reactive<FormModel>({
  ...baseFormModel,
})

// 是否全选
let hasCheckedAll = $ref(false)
const { loading, startLoading, endLoading } = useLoading()
// 所有的菜单项 `id`，包含子集合
const allMenuOptionsKeys = $computed(() => {
  const keys: number[] = []
  const dfs = (keys: number[], { key, children }: TreeOption) => {
    if (key)
      keys.push(key as number)
    if (children?.length)
      children.forEach(i => dfs(keys, i))
  }
  menuTreeData.forEach(i => dfs(keys, i))
  return keys
})

/**
 * 判断是否全选
 */
function handleCheckedAllOptionsOrNot() {
  const menuIdListLength = formModel.menuIdList?.length ?? 0
  hasCheckedAll = menuIdListLength > 0 && menuIdListLength === allMenuOptionsKeys.length
}

watch(() => formModel.menuIdList, handleCheckedAllOptionsOrNot)

function handleCheckAll() {
  formModel.menuIdList = hasCheckedAll
    ? allMenuOptionsKeys
    : []
}

/**
 * 表单赋值
 */
function assign() {
  const target: Role = modalVisible && type === 'edit'
    ? unref(form)
    : baseFormModel
  type K = keyof FormModel
  for (const [key, value] of Object.entries(target)) {
    if (!Object.prototype.hasOwnProperty.call(formModel, key))
      continue
    formModel[key as K] = value
  }
}

watch(() => modalVisible, () => {
  assign()
  endLoading()
  refForm.value?.restoreValidation()
})

/**
 * 提交表单
 */
function onSubmit(e: MouseEvent) {
  e.preventDefault()
  refForm.value?.validate((errors?: FormValidationError[]) => {
    if (errors)
      return
    startLoading()
    emits('saveRoleData', JSON.parse(JSON.stringify(formModel)))
  })
}

/**
 * 关闭 `modal`
 */
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
    <n-form
      ref="refForm"
      :model="formModel"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      :show-require-mark="false"
      :style="{
        maxWidth: '600px',
      }"
    >
      <n-form-item label="角色名称" path="name">
        <n-input v-model:value="formModel.name" placeholder="请输入角色名称" clearable>
          <template #clear-icon>
            <n-icon :component="TrashBinOutlineIcon" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item label="角色描述" path="description">
        <n-input
          v-model:value="formModel.description"
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
                🤔
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
            v-model:checked-keys="formModel.menuIdList"
            block-line
            cascade
            checkable
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
        <n-button type="primary" :loading="loading" text-color="white" @click="onSubmit">
          <span font-bold>保存</span>
        </n-button>
        <n-button type="error" text-color="white" @click="onCloseModal">
          <span font-bold>取消</span>
        </n-button>
      </div>
    </template>
  </n-modal>
</template>
