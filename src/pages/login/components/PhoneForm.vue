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
import { REGEXP_PHONE, countSendingSmsCode, getSmsCode } from './sms-code'
import type { PhoneForm } from './interfaces'
import { findFirstRouteInPermission } from '~/utils'

const router = useRouter()
const authStore = useAuthStore()
const refForm = ref<FormInst | null>(null)

const baseFormModel = isDevelopment
  ? {
      phone: '13650223322',
      code: '123456',
    }
  : {
      phone: '',
      code: '',
    }
const formModel = reactive<PhoneForm>({
  ...baseFormModel,
})

function validatePhone(value: string) {
  return REGEXP_PHONE.test(value)
}
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
function onSubmit(e: MouseEvent) {
  e.preventDefault()
  refForm.value?.validate((errors?: FormValidationError[]) => {
    if (errors) return
    if (formModel.code !== '123456') {
      $message.error('验证码错误')
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

const refInputPhone = ref()
const focusFirstInput = () => refInputPhone.value?.focus()

const codeInputDisabled = computed(() => !formModel.phone || !validatePhone(formModel.phone))

const {
  loading: smsLoading,
  startLoading: startSmsLoading,
  endLoading: endSmsLoading,
} = useLoading(false)
const {
  isCounting,
  sendCodeBtnLabel,
  startCounting,
} = countSendingSmsCode()
function handleSmsCode() {
  startSmsLoading()
  useTimeoutFn(() => {
    $message.success('验证码发送成功')
    endSmsLoading()
    startCounting()
    getSmsCode()
  }, 1000)
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
      <div class="flex-y-c w-full">
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
          size="large" type="primary" text-color="white"
          :disabled="codeInputDisabled || isCounting"
          :loading="!codeInputDisabled && smsLoading"
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
