<script setup lang="ts">
import type {
  FormInst,
  FormItemInst,
  FormItemRule,
  FormRules,
} from 'naive-ui'
import { appMeta } from '~/config'

interface ModelType {
  username?: string
  password?: string
  reenteredPassword?: string
}

const { message } = useGlobalNaiveApi()

const refForm = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)

const baseFormModel = {
  username: '',
  password: '',
  reenteredPassword: '',
}

const formModel = reactive<ModelType>({
  ...baseFormModel,
})

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

function validatePasswordSame(_rule: FormItemRule, value: string): boolean {
  return value === formModel.password
}

const rules: FormRules = {
  username: [
    {
      required: true,
      message: '请输入账号',
    },
    {
      validator(_rule: FormItemRule, value: number) {
        return value >= 6 && value <= 20
      },
      message: '账号的长度为 6 ~ 20',
      trigger: ['input', 'blur'],
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
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
}

function handlePasswordInput() {
  if (formModel.reenteredPassword)
    rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
}

function onSubmit(e: MouseEvent) {
  e.preventDefault()
  refForm.value?.validate((errors) => {
    if (!errors)
      message.success('验证成功')

    else

      message.error('验证失败')
  })
}
</script>

<template>
  <a-space direction="vertical" size="large" w-450px class="mt-1/15">
    <div text="32px center" font-bold>
      🎃 {{ appMeta.name }}
    </div>
    <n-form ref="refForm" :model="formModel" :rules="rules">
      <n-form-item path="username" label="账号">
        <n-input v-model:value="formModel.username" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="password" label="密码">
        <n-input
          v-model:value="formModel.password"
          type="password"
          @input="handlePasswordInput"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item
        ref="rPasswordFormItemRef"
        first
        path="reenteredPassword"
        label="重复密码"
      >
        <n-input
          v-model:value="formModel.reenteredPassword"
          :disabled="!formModel.password"
          type="password"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-button
        block strong round type="primary"
        @click="onSubmit"
      >
        登录
      </n-button>
    </n-form>
    <div flex justify-center items-center>
      <DarkToggle />
      <span ml-5 op-50 text-xl>🙌🙌 By {{ appMeta.author }} 🙌🙌</span>
    </div>
  </a-space>
</template>
