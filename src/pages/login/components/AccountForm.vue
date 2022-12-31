<script setup lang="ts">
import type {
  FormInst,
  FormItemRule,
  FormRules,
  FormValidationError,
} from 'naive-ui'
import {
  Glasses as GlassesIcon,
  GlassesOutline as GlassesOutlineIcon,
  TrashBinOutline as TrashBinOutlineIcon,
} from '@vicons/ionicons5'
import type { AccountForm } from './interfaces'
import { findFirstRouteInPermission } from '~/utils'

const router = useRouter()
const authStore = useAuthStore()
const refForm = ref<FormInst | null>(null)

const baseFormModel = isDevelopment
  ? {
      username: 'admin',
      password: '123456',
    }
  : {
      username: '',
      password: '',
    }
const formModel = reactive<AccountForm>({
  ...baseFormModel,
})

const rules: FormRules = {
  username: [
    {
      required: true,
      message: '请输入账号',
    },
    {
      validator(_rule: FormItemRule, value: string) {
        return value.length >= 5 && value.length <= 20
      },
      message: '账号的长度为 5 ~ 20',
      trigger: ['input', 'blur'],
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
  ],
}

const refInputUserName = ref()
const focusFirstInput = () => refInputUserName.value?.focus()

const { loading, startLoading, endLoading } = useLoading()
function onSubmit(e: MouseEvent) {
  e.preventDefault()
  refForm.value?.validate((errors?: FormValidationError[]) => {
    if (errors) return
    if (formModel.password !== '123456') {
      $message.error('账号或密码错误')
      return
    }
    startLoading()
    const data = {
      id: 1,
      username: 'admin',
      name: 'admin',
      roleId: 1,
      phone: '6666666666',
      email: 'dasb@qq.com',
      createTime: new Date(),
    }
    authStore
      .login(data)
      .then(() => useTimeoutFn(() => {
        router.push(findFirstRouteInPermission())
        $notification.success({
          title: '登录成功',
          content: '欢迎使用~',
          duration: 3000,
        })
      }, 500))
      .finally(() => useTimeoutFn(endLoading, 1000))
  })
}

defineExpose({ focusFirstInput })
</script>

<template>
  <n-form
    ref="refForm"
    :model="formModel"
    :rules="rules"
    :show-require-mark="false"
    size="large"
    min-w-350px
  >
    <n-form-item path="username" label="账号">
      <n-input ref="refInputUserName" v-model:value="formModel.username" clearable @keydown.enter.prevent>
        <template #clear-icon>
          <n-icon :component="TrashBinOutlineIcon" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item path="password" label="密码">
      <n-input
        v-model:value="formModel.password"
        type="password"
        clearable
        show-password-on="click"
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
    <n-button
      block type="primary" :loading="loading"
      mt-3 text-color="white" @click="onSubmit"
    >
      <span font-bold text-lag>登录</span>
    </n-button>
  </n-form>
</template>
