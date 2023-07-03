<script setup lang="ts">
import type { FormItemInst, FormItemRule } from 'naive-ui'
import type { User } from '~/types'

const props = defineProps<{
  type: 'add' | 'edit'
  data?: User
}>()
const emit = defineEmits<{
  'saveData': [data: User]
}>()
const { visible } = defineModels< { visible: boolean }>()
const refForm = ref()
function getBase() {
  return {
    id: undefined,
    username: '',
    name: '',
    password: '',
    reenteredPassword: '',
    avatar: undefined,
    roleId: undefined,
  }
}
const {
  formModel,
  loading,
  endLoading,
  assign,
  ok,
} = useFormModel<User>({
  getBase,
  refForm,
})
watch(visible, (val) => {
  if (val) {
    assign([getBase(), props.data][Number(props.type === 'edit')])
    endLoading()
    refForm.value?.clearValidate()
  }
})
function handleOk() {
  ok(() => {
    if (props.type === 'edit')
      formModel.password = undefined
    emit('saveData', clone(formModel))
  })
}

const refRPasswordFormItem = ref<FormItemInst | null>(null)
function handlePasswordInput() {
  if (formModel.reenteredPassword)
    refRPasswordFormItem.value?.validate({ trigger: 'password-input' })
}
function validatePasswordStartWith(_rule: FormItemRule, value: string) {
  return !!formModel.password
    && formModel.password.startsWith(value)
    && formModel.password.length >= value.length
}
function validatePasswordSame(_rule: FormItemRule, value: string) {
  return value === formModel.password
}
const rules = {
  username: [
    {
      required: true,
      message: '请输入用户账号',
    },
  ],
  name: [
    {
      required: true,
      message: '请输入用户名称',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入用户密码',
    },
  ],
  reenteredPassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur'],
    },
    {
      validator: validatePasswordStartWith,
      message: '两次密码输入不一致',
      trigger: 'input',
    },
    {
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input'],
    },
  ],
  roleId: [
    {
      required: true,
      message: '请选择用户角色',
    },
  ],
}

defineExpose({ endLoading })
</script>

<template>
  <CommonModal
    :show="visible"
    :loading="loading"
    :title="['新增用户', '编辑用户'][Number(type === 'edit')]"
    :handle-ok="handleOk"
    :on-close="() => visible = false"
  >
    <CommonForm ref="refForm" :model="formModel" :rules="rules">
      <n-form-item label="用户账号" path="username">
        <n-input v-model:value="formModel.username" placeholder="请输入用户账号" clearable />
      </n-form-item>
      <n-form-item label="用户名称" path="name">
        <n-input v-model:value="formModel.name" placeholder="请输入用户名称" clearable />
      </n-form-item>
      <n-form-item v-if="type === 'add'" label="用户密码" path="password">
        <n-input
          v-model:value="formModel.password"
          placeholder="请输入用户密码"
          type="password"
          clearable
          show-password-on="click"
          @input="handlePasswordInput"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item
        v-if="type === 'add'"
        ref="refRPasswordFormItem"
        first
        label="重复密码"
        path="reenteredPassword"
      >
        <n-input
          v-model:value="formModel.reenteredPassword"
          :disabled="!formModel.password"
          placeholder="请输入重复密码"
          show-password-on="click"
          type="password"
          clearable
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item label="用户角色" path="roleId">
        <n-select v-model:value="formModel.roleId" placeholder="请选择用户角色" :options="O.options('role')" clearable />
      </n-form-item>
    </CommonForm>
  </CommonModal>
</template>
