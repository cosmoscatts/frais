<script setup lang="ts">
import type {
  FormInst,
  FormItemInst,
  FormItemRule,
  FormRules,
} from 'naive-ui'
import {
  Glasses as GlassesIcon,
  GlassesOutline as GlassesOutlineIcon,
  TrashBinOutline as TrashBinOutlineIcon,
} from '@vicons/ionicons5'
import type { User } from '~/types'

interface FormModel {
  id?: number
  password?: string
  newPassword?: string
  reenteredNewPassword?: string
}

const {
  currentTab = 1,
} = defineProps<{
  currentTab?: number
}>()

const router = useRouter()
const authStore = useAuthStore()
const refForm = ref<FormInst | null>(null)

function getBaseFormModel() {
  const { id } = G.clone<User>(authStore.user!)
  return {
    id,
    password: '',
    newPassword: '',
    reenteredNewPassword: '',
  }
}

let formModel = $ref<FormModel>(getBaseFormModel())

function resetFormModel() {
  formModel = getBaseFormModel()
  refForm.value?.restoreValidation()
}
watch(() => currentTab, resetFormModel)

const { loading, startLoading, endLoading } = useLoading()

function onSubmit(e: MouseEvent) {
  e.preventDefault()
  refForm.value?.validate((errors) => {
    if (errors) return
    startLoading()
    useTimeoutFn(() => {
      endLoading()
      $message.success('修改成功')
      authStore
        .logout()
        .then(() => useTimeoutFn(() => {
          $message.warning('请重新登录')
          router.push('/login')
        }, 500))
    }, 1000)
  })
}

const refRNewPasswordFormItem = ref<FormItemInst | null>(null)
function handlePasswordInput() {
  if (formModel.reenteredNewPassword) {
    refRNewPasswordFormItem.value?.validate({ trigger: 'password-input' })
  }
}
function validatePasswordStartWith(_rule: FormItemRule,
  value: string) {
  return !!formModel.newPassword
    && formModel.newPassword.startsWith(value)
    && formModel.newPassword.length >= value.length
}
const validatePasswordSame = (_rule: FormItemRule, value: string) => value === formModel.newPassword
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
