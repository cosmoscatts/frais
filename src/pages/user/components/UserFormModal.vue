<script setup lang="ts">
import type { FormInst, FormItemInst, FormItemRule, FormValidationError, SelectOption } from 'naive-ui'
import {
  Glasses as GlassesIcon,
  GlassesOutline as GlassesOutlineIcon,
  TrashBinOutline as TrashBinOutlineIcon,
} from '@vicons/ionicons5'
import Flash16Regular from '@vicons/fluent/Flash16Regular'
import { createRules } from '../helper.form'
import type { User } from '~/types'

const {
  type = 'add',
  modalVisible = false,
  form = {},
  roleOptions = [],
} = defineProps<{
  /** 表单操作类型 */
  type?: 'add' | 'edit'
  /** 表单是否显示 */
  modalVisible?: boolean
  /** 表单数据 */
  form?: User
  /** 菜单树数据 */
  roleOptions?: SelectOption[]
}>()

const emits = defineEmits(['update:modal-visible', 'saveUserData'])

// 标题
const title = computed(() => type === 'add' ? '新增用户' : '编辑用户')

// `card` 分级
const segmented = {
  content: 'soft',
  footer: 'soft',
} as const

// `form` 表单元素
const refForm = ref<FormInst | null>(null)

type FormModel = Omit<User, 'createTime' | 'updateTime' | 'role'> & { reenteredPassword?: string }
const baseFormModel: FormModel = {
  id: undefined,
  username: '',
  name: '',
  password: '',
  reenteredPassword: '',
  avatar: undefined,
  phone: '',
  email: '',
  roleId: undefined,
}
const formModel = reactive<FormModel>({
  ...baseFormModel,
})

const { loading, startLoading, endLoading } = useLoading()

/**
 * 表单赋值
 */
function assign() {
  const target: User = modalVisible && type === 'edit'
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
  refForm.value && refForm.value.restoreValidation()
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
    emits('saveUserData', JSON.parse(JSON.stringify(formModel)))
  })
}

/**
 * 关闭 `modal`
 */
function onCloseModal() {
  emits('update:modal-visible', false)
}

// 重复密码框元素
const refRPasswordFormItem = ref<FormItemInst | null>(null)

/**
 * 处理密码框的输入，当输入密码时，触发重复密码框的校验
 */
function handlePasswordInput() {
  if (formModel.reenteredPassword)
    refRPasswordFormItem.value?.validate({ trigger: 'password-input' })
}

/**
 * 校验重复密码是否以输入的密码为开头
 */
function validatePasswordStartWith(
  _rule: FormItemRule,
  value: string,
): boolean {
  return (
    !!formModel.password
    && formModel.password.startsWith(value)
    && formModel.password.length >= value.length
  )
}

/**
 * 校验两次输入的密码是否一致
 */
function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === formModel.password
}

// 生成表单校验规则
const rules = createRules(
  validatePasswordStartWith,
  validatePasswordSame,
)
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
      <n-form-item label="用户账号" path="username">
        <n-input v-model:value="formModel.username" placeholder="请输入用户账号" clearable>
          <template #clear-icon>
            <n-icon :component="TrashBinOutlineIcon" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item label="用户名称" path="name">
        <n-input v-model:value="formModel.name" placeholder="请输入用户名称" clearable>
          <template #clear-icon>
            <n-icon :component="TrashBinOutlineIcon" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item v-if="type === 'add'" label="用户密码" path="password">
        <n-input
          v-model:value="formModel.password"
          type="password" placeholder="请输入用户密码" clearable
          show-password-on="click" @input="handlePasswordInput"
          @keydown.enter.prevent
        >
          <template #clear-icon>
            <n-icon :component="TrashBinOutlineIcon" />
          </template>
          <template #password-visible-icon>
            <n-icon :size="16" :component="GlassesOutlineIcon" />
          </template>
          <template #password-invisible-icon>
            <n-icon :size="16" :component="GlassesIcon" />
          </template>
        </n-input>
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
          :disabled="!formModel.password" show-password-on="click"
          type="password" placeholder="请输入重复密码" clearable
          @keydown.enter.prevent
        >
          <template #clear-icon>
            <n-icon :component="TrashBinOutlineIcon" />
          </template>
          <template #password-visible-icon>
            <n-icon :size="16" :component="GlassesOutlineIcon" />
          </template>
          <template #password-invisible-icon>
            <n-icon :size="16" :component="GlassesIcon" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item label="用户角色" path="roleId">
        <n-select v-model:value="formModel.roleId" placeholder="请选择用户角色" :options="roleOptions" clearable>
          <template #arrow>
            <Flash16Regular />
          </template>
        </n-select>
      </n-form-item>
      <n-form-item label="手机号" path="phone">
        <n-input v-model:value="formModel.phone" placeholder="请输入手机号" clearable>
          <template #clear-icon>
            <n-icon :component="TrashBinOutlineIcon" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item label="用户邮箱" path="email">
        <n-input v-model:value="formModel.email" placeholder="请输入用户邮箱" clearable>
          <template #clear-icon>
            <n-icon :component="TrashBinOutlineIcon" />
          </template>
        </n-input>
      </n-form-item>
    </n-form>
    <template #footer>
      <div flex-center gap-x-5>
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

