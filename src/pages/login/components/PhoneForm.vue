<script setup lang="ts">
import type {
  FormInst,
  FormItemRule,
  FormRules,
  FormValidationError,
} from 'naive-ui'
import {
  TrashBinOutline as TrashBinOutlineIcon,
} from '@vicons/ionicons5'
import { REGEXP_PHONE } from '../helper'
import { debug } from '~/config'
import { findFirstPermissionRoute, loginCallback } from '~/utils'

/**
 * 定义表单数据结构
 */
interface ModelType {
  phone?: string
  code?: string
}

const router = useRouter()
const { message, notification } = useGlobalNaiveApi()

const refForm = ref<FormInst | null>(null)

// 表单基础数据
const baseFormModel = debug
  ? {
      phone: '13650223322',
      code: '123456',
    }
  : {
      phone: '',
      code: '',
    }

// 表单数据
const formModel = reactive<ModelType>({
  ...baseFormModel,
})

/**
 * 校验手机号
 */
function validatePhone(value: string) {
  return REGEXP_PHONE.test(value)
}

// 表单校验规则
const rules: FormRules = {
  phone: [
    {
      required: true,
      message: '请输入手机号',
    },
    {
      validator(_rule: FormItemRule, value: string) {
        return validatePhone(value)
      },
      message: '请输入正确的手机号',
      trigger: ['input'],
    },
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
    },
  ],
}

const { loading, startLoading, endLoading } = useLoading()

/**
 * 登录
 */
function onSubmit(e: MouseEvent) {
  e.preventDefault()
  refForm.value?.validate(async (errors?: FormValidationError[]) => {
    if (errors)
      return
    if (formModel.code !== '123456') {
      message.error('验证码错误')
      return
    }
    startLoading()
    await loginCallback({
      id: 1,
      username: 'admin',
      name: 'admin',
      roleId: 1,
      phone: '6666666666',
      email: 'dasb@qq.com',
      createTime: new Date(),
    })
    const path = findFirstPermissionRoute() ?? '/'
    useTimeoutFn(() => {
      endLoading()
      router.push(path)
      notification.success({
        title: '登录成功',
        content: '欢迎使用~',
        duration: 3000,
      })
    }, 1000)
  })
}

// 实现聚焦功能
const refInputPhone = ref()
function focusFirstInput() {
  refInputPhone.value?.focus()
}

function handleSmsCode() {
  // getSmsCode(model.phone)
}

// 禁用验证码及发送按钮
const codeInputDisabled = computed(() => (!formModel.phone || !validatePhone(formModel.phone)))

const isCounting = ref(false)
const smsLoading = ref(true)
const sendCodeBtnLabel = ref('')

defineExpose({
  focusFirstInput,
})
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
    <n-form-item path="phone" label="手机号">
      <n-input
        ref="refInputPhone"
        v-model:value="formModel.phone"
        clearable
        @keydown.enter.prevent
      >
        <template #clear-icon>
          <n-icon :component="TrashBinOutlineIcon" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item path="code" label="验证码">
      <div class="flex-y-center w-full">
        <n-input
          v-model:value="formModel.code"
          :disabled="codeInputDisabled"
          clearable
        >
          <template #clear-icon>
            <n-icon :component="TrashBinOutlineIcon" />
          </template>
        </n-input>
        <div class="w-18px" />
        <n-button
          size="large"
          :disabled="codeInputDisabled || isCounting"
          :loading="smsLoading"
          @click="handleSmsCode"
        >
          {{ sendCodeBtnLabel }}
        </n-button>
      </div>
    </n-form-item>
    <n-button
      block type="primary" :loading="loading"
      mt-3 text-color="white" @click="onSubmit"
    >
      <span font-bold text-lag>登录</span>
    </n-button>
  </n-form>
</template>
