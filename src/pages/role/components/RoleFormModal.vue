<script setup lang="ts">
import type { FormValidationError, TreeOption } from 'naive-ui'
import { rules } from '../helper.form'
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

const { loading, startLoading, endLoading } = useLoading()

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
  refForm.value && refForm.value.clearValidate()
})

function onSubmit(e: MouseEvent) {
  e.preventDefault()
  refForm.value?.validate((errors?: FormValidationError[]) => {
    if (errors)
      return
    startLoading()
    emits('saveRoleData', JSON.parse(JSON.stringify(formModel)))
  })
  e.preventDefault()
}

/**
 * 关闭 `modal`
 */
function onCloseModal() {
  emits('update:modal-visible', false)
}

/**
 * 更新选中的菜单项
 */
function updateCheckedKeys() {

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
      :style="{
        maxWidth: '600px',
      }"
    >
      <n-form-item label="角色名称" path="name">
        <n-input v-model:value="formModel.name" placeholder="请输入角色名称" />
      </n-form-item>
      <n-form-item label="角色描述" path="description">
        <n-input
          v-model:value="formModel.description"
          placeholder="请输入角色描述"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 5,
          }"
        />
        <n-form-item label="菜单权限" path="menuIdList">
          <n-tree
            block-line
            cascade
            checkable
            default-expand-all
            :data="menuTreeData"
            :default-checked-keys="formModel.menuIdList"
            @update:checked-keys="updateCheckedKeys"
          />
        </n-form-item>
      </n-form-item>
    </n-form>
    <template #footer>
      <div flex-center gap-x-5>
        <n-button type="primary" :loading="loading" @click="onSubmit">
          <span text-white font-bold>保存</span>
        </n-button>
        <n-button type="error" @click="onCloseModal">
          <span text-white font-bold>取消</span>
        </n-button>
      </div>
    </template>
  </n-modal>
</template>
