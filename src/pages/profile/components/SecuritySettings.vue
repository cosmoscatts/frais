<script setup lang="ts">
import type { FormInst, FormItemInst, FormItemRule, FormRules } from 'naive-ui'
import {
  Glasses as GlassesIcon,
  GlassesOutline as GlassesOutlineIcon,
  TrashBinOutline as TrashBinOutlineIcon,
} from '@vicons/ionicons5'

const {
  currentTab = 1,
} = defineProps<{
  /** 当前 `tab` */
  currentTab?: number
}>()

const router = useRouter()

// `form` 表单元素
const refForm = ref<FormInst | null>(null)

/** 定义表单数据结构 */
interface FormModel {
  /** id */
  id?: number
  /** 原密码 */
  password?: string
  /** 新密码 */
  newPassword?: string
  /** 重复密码 */
  reenteredNewPassword?: string
}

const { user } = storeToRefs(useUserStore())

const { message } = useGlobalNaiveApi()

/**
 * 获取表单数据
 */
function getBaseFormModel(): FormModel {
  const { value: _user } = user
  const { id } = JSON.parse(JSON.stringify(_user))
  return {
    id,
    password: '',
    newPassword: '',
    reenteredNewPassword: '',
  }
}

let formModel = $ref<FormModel>(getBaseFormModel())

/**
 * 重置表单数据及校验状态
 */
function resetFormModel() {
  formModel = getBaseFormModel()
  refForm.value?.restoreValidation()
}

// 当 `tab` 改变，重置表单及校验
watch(() => currentTab, resetFormModel)

const { loading, startLoading, endLoading } = useLoading()

/**
 * 保存修改内容
 */
function onSubmit(e: MouseEvent) {
  e.preventDefault()
  refForm.value?.validate((errors) => {
    if (errors)
      return
    startLoading()
    useTimeoutFn(() => {
      endLoading()
      message.success('修改成功')
      useTimeoutFn(() => {
        router.push('/login')
        useLogout()
        message.warning('请重新登录')
      }, 1000)
    }, 1500)
  })
}

// 重复密码框元素
const refRNewPasswordFormItem = ref<FormItemInst | null>(null)

/**
 * 处理密码框的输入，当输入密码时，触发重复密码框的校验
 */
function handlePasswordInput() {
  if (formModel.reenteredNewPassword)
    refRNewPasswordFormItem.value?.validate({ trigger: 'password-input' })
}

/**
 * 校验重复密码是否以输入的密码为开头
 */
function validatePasswordStartWith(
  _rule: FormItemRule,
  value: string,
): boolean {
  return (
    !!formModel.newPassword
    && formModel.newPassword.startsWith(value)
    && formModel.newPassword.length >= value.length
  )
}

/**
 * 校验两次输入的密码是否一致
 */
function validatePasswordSame(_rule: FormItemRule, value: string): boolean {
  return value === formModel.newPassword
}

// 表单校验规则
const rules: FormRules = {
  password: [
    {
      required: true,
      message: '请输入用户密码',
    },
  ],
  newPassword: [
    {
      required: true,
      message: '请输入用户密码',
    },
  ],
  reenteredNewPassword: [
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
}
</script>

<template>
  <n-form
    ref="refForm"
    :model="formModel"
    :rules="rules"
    label-placement="left"
    label-width="auto"
    :show-require-mark="false"
    :style="{
      maxWidth: '600px',
      margin: 'auto',
      paddingTop: '15px',
    }"
  >
    <n-form-item label="原密码" path="password">
      <n-input
        v-model:value="formModel.password"
        type="password" placeholder="请输入原密码" clearable
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
    <n-form-item label="新密码" path="newPassword">
      <n-input
        v-model:value="formModel.newPassword"
        type="password" placeholder="请输入新密码" clearable
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
      ref="refRNewPasswordFormItem"
      first
      label="重复密码"
      path="reenteredNewPassword"
    >
      <n-input
        v-model:value="formModel.reenteredNewPassword"
        :disabled="!formModel.newPassword" show-password-on="click"
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

    <div flex-c>
      <n-button
        type="primary" :loading="loading" text-color="white"
        :style="{ marginRight: '15px' }" @click="onSubmit"
      >
        <span font-bold>保存</span>
      </n-button>
      <n-button type="error" text-color="white" @click="resetFormModel">
        <span font-bold>重置</span>
      </n-button>
    </div>
  </n-form>
</template>
