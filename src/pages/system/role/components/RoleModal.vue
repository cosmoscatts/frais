<script setup lang="ts">
import type { FormRules } from 'naive-ui'
import type { Role } from '~/types'
import { MENUS } from '~/constants'

const props = defineProps<{
  type: 'add' | 'edit'
  data?: Role
}>()
const emit = defineEmits<{
  'saveData': [data: Role]
}>()
const { visible } = defineModels< { visible: boolean }>()
const refForm = ref()
function getBase() {
  return {
    id: undefined,
    name: '',
    description: '',
    menuIdList: [],
  }
}
const {
  formModel,
  loading,
  endLoading,
  assign,
  ok,
} = useFormModel<Role>({
  getBase,
  refForm,
})
const treeData = generateTreeMenuData(MENUS)
watch(visible, (val) => {
  if (val) {
    assign([getBase(), props.data][Number(props.type === 'edit')])
    endLoading()
    refForm.value?.clearValidate()
  }
})
function handleOk() {
  ok(() => {
    emit('saveData', clone(formModel))
  })
}

const rules: FormRules = {
  name: [
    {
      required: true,
      message: '请输入角色名称',
    },
  ],
  description: [
    {
      required: true,
      message: '请输入角色描述',
    },
  ],
  menuIdList: [
    {
      required: true,
      message: '请设置角色菜单权限',
    },
  ],
}

const allCheckedKeys = $computed<number[]>(() => {
  return flattenMenu(MENUS).map(item => item.id)
})
const isAllChecked = $computed(() => {
  return [
    formModel.menuIdList?.length,
    formModel.menuIdList?.length === allCheckedKeys.length,
  ].filter(Boolean).length === 2
})
function toggleChecked() {
  formModel.menuIdList = [allCheckedKeys, []][Number(isAllChecked)]
}

defineExpose({ endLoading })
</script>

<template>
  <CommonModal
    :show="visible"
    :loading="loading"
    :title="['新增角色', '编辑角色'][Number(type === 'edit')]"
    :handle-ok="handleOk"
    :on-close="() => visible = false"
  >
    <CommonForm ref="refForm" :model="formModel" :rules="rules">
      <n-form-item label="角色名称" path="name">
        <n-input v-model:value="formModel.name" placeholder="请输入角色名称" clearable />
      </n-form-item>
      <n-form-item label="角色描述" path="description">
        <n-input
          v-model:value="formModel.description"
          placeholder="请输入角色描述"
          type="textarea" clearable w-full
          :autosize="{
            minRows: 3,
            maxRows: 5,
          }"
        />
      </n-form-item>
      <n-form-item label="菜单权限" path="menuIdList">
        <div flex="~ col">
          <div my-5px ml-12px flex justify-start>
            <n-switch :value="isAllChecked" size="large" :round="false" @click="toggleChecked">
              <template #checked>
                <span font-bold>反选</span>
              </template>
              <template #unchecked>
                <span font-bold>全选</span>
              </template>
            </n-switch>
          </div>
          <n-tree
            v-model:checked-keys="formModel.menuIdList"
            cascade checkable check-on-click block-line default-expand-all
            :selectable="false"
            :data="treeData"
          />
        </div>
      </n-form-item>
    </CommonForm>
  </CommonModal>
</template>
