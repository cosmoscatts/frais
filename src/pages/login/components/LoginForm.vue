<script setup lang="ts">
import type {
  FormInst,
  FormItemRule,
  FormRules,
} from 'naive-ui'
import { appMeta, debug } from '~/config'
import { findFirstPermissionRoute, loginCallback } from '~/utils'

interface ModelType {
  username?: string
  password?: string
}

const router = useRouter()
const { message } = useGlobalNaiveApi()

const refForm = ref<FormInst | null>(null)

const baseFormModel = debug
  ? {
      username: 'admin',
      password: '123456',
    }
  : {
      username: '',
      password: '',
    }

const formModel = reactive<ModelType>({
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

function onSubmit(e: MouseEvent) {
  e.preventDefault()
  refForm.value?.validate(async (errors) => {
    if (errors)
      return
    if (formModel.password !== '123456') {
      message.error('账号或密码错误')
      return
    }
    message.success('欢迎使用')
    await loginCallback({
      id: 1,
      username: 'admin',
      name: 'admin',
      roleId: 1,
      createTime: new Date(),
    })
    const path = findFirstPermissionRoute() ?? '/'
    useTimeoutFn(() => {
      router.push(path)
    }, 1000)
  })
}
</script>

<template>
  <div flex="y-center col" mt-200px>
    <div text="32px center" font-bold>
      🎃 {{ appMeta.name }}
    </div>

    <n-form ref="refForm" :model="formModel" :rules="rules" size="large" w-450px>
      <n-form-item path="username" label="账号">
        <n-input v-model:value="formModel.username" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="password" label="密码">
        <n-input
          v-model:value="formModel.password"
          type="password"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-button
        block round type="primary"
        mt-3 @click="onSubmit"
      >
        <span font-bold text="lg white">登录</span>
      </n-button>
    </n-form>

    <div flex-center mt-200px>
      <DarkToggle />
      <span ml-5 op-50 text-xl>🙌🙌 By {{ appMeta.author }} 🙌🙌</span>
    </div>
  </div>
</template>
