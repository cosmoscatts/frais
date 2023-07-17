<script setup lang="ts">
import type { FormItemInst, FormItemRule, FormRules } from 'naive-ui'
import type { User } from '~/types'

const { currentTab } = defineProps<{ currentTab: number }>()

const router = useRouter()
const message = useMessage()

const authStore = useAuthStore()

const refForm = ref()
const refRNewPasswordFormItem = ref<FormItemInst | null>(null)

function getBase() {
  const user = clone(authStore.user!)
  return {
    id: user.id,
    password: '',
    newPassword: '',
    reenteredNewPassword: '',
  }
}

const {
  formModel,
  reset,
  ok,
  loading,
  endLoading,
} = useFormModel<User>({ getBase, refForm })
watch(() => currentTab, reset)

function onSubmit(e: MouseEvent) {
  e.preventDefault()
  ok(() => {
    endLoading()
    message.success('修改成功')
    useTimeoutFn(() => {
      authStore.logout()
      message.warning('请重新登录')
      router.push('/login')
    }, 200)
  })
}

function handlePasswordInput() {
  if (formModel.reenteredNewPassword)
    refRNewPasswordFormItem.value?.validate({ trigger: 'password-input' })
}
function validatePasswordStartWith(_rule: FormItemRule, value: string) {
  return !!formModel.newPassword
    && formModel.newPassword.startsWith(value)
    && formModel.newPassword.length >= value.length
}
function validatePasswordSame(_rule: FormItemRule, value: string) {
  return value === formModel.newPassword
}

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
  <CommonForm ref="refForm" :model="formModel" :rules="rules" :style="{ margin: 'auto', paddingTop: '15px', minHeight: '250px' }">
    <n-form-item label="原密码" path="password">
      <n-input
        v-model:value="formModel.password"
        type="password"
        placeholder="请输入原密码"
        clearable
        show-password-on="click"
        @input="handlePasswordInput"
        @keydown.enter.prevent
      />
    </n-form-item>
    <n-form-item label="新密码" path="newPassword">
      <n-input
        v-model:value="formModel.newPassword"
        type="password"
        placeholder="请输入新密码"
        clearable
        show-password-on="click"
        @input="handlePasswordInput"
        @keydown.enter.prevent
      />
    </n-form-item>
    <n-form-item
      ref="refRNewPasswordFormItem"
      label="重复密码"
      path="reenteredNewPassword"
      first
    >
      <n-input
        v-model:value="formModel.reenteredNewPassword"
        :disabled="!formModel.newPassword"
        show-password-on="click"
        placeholder="请输入重复密码"
        type="password"
        clearable
        @keydown.enter.prevent
      />
    </n-form-item>
    <div flex-center>
      <n-button
        type="primary" :loading="loading" text-color="white"
        :style="{ marginRight: '15px' }" @click="onSubmit"
      >
        <span font-bold>保存</span>
      </n-button>
      <n-button type="error" text-color="white" @click="reset">
        <span font-bold>重置</span>
      </n-button>
    </div>
  </CommonForm>
</template>
