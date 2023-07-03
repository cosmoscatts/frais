<script setup lang="ts">
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import LoginSocialButton from './LoginSocialButton.vue'
import LoginTips from './LoginTips.vue'
import { LOGO, APP_META as meta } from '~/constants'
import { getToRouteAfterLogin } from '~/utils'

const router = useRouter()
const message = useMessage()
const notification = useNotification()
const authStore = useAuthStore()

const refForm = ref<FormInst | null>(null)
const refInputUserName = ref()

function getBase() {
  return isDevelopment()
    ? {
        username: 'admin',
        password: '123456',
      }
    : {
        username: '',
        password: '',
      }
}

const { formModel, ok, loading, endLoading } = useFormModel({
  getBase,
  refForm,
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

function submit() {
  ok(() => {
    if (formModel.username !== 'admin' || formModel.password !== '123456') {
      message.error('账号或密码错误')
      endLoading()
      return
    }
    authStore.login({
      id: 1,
      username: 'admin',
      name: 'admin',
      roleId: 1,
      createTime: getRandomDateStr(),
    }).then(() => {
      const path = getToRouteAfterLogin()
      if (!path) {
        message.error('请联系管理员配置菜单')
        return
      }
      useTimeoutFn(() => {
        endLoading()
        router.push(path)
        notification.success({
          title: '登录成功',
          content: '你好，admin。欢迎回来！',
        })
      }, 500)
    })
  })
}

function focusFirstInput() {
  refInputUserName.value?.focus()
}
onMounted(focusFirstInput)
</script>

<template>
  <n-card hoverable :style="{ width: '380px' }" relative>
    <div absolute left-160px top--30px>
      <n-avatar round :size="60" :src="LOGO" />
    </div>

    <div>
      <h1 text-24px font-bold>
        登录
      </h1>
      <p>{{ meta.name }} 管理系统，欢迎使用！</p>
    </div>

    <div grid="cols-1 gap-5" mt-15px>
      <LoginSocialButton>
        <div i-carbon-logo-github mr-3 bg-dark text-14px dark:bg-white /> <span>以 GitHub 登录</span>
      </LoginSocialButton>
      <LoginSocialButton>
        <div i-logos-google-icon mr-3 text-14px /><span>以 Google 登录</span>
      </LoginSocialButton>
    </div>

    <n-divider>
      账密登录
    </n-divider>

    <n-form
      ref="refForm"
      :model="formModel"
      :rules="rules"
      :show-require-mark="false"
      size="small"
      :show-feedback="false"
    >
      <n-form-item path="username" label="账号" mb-10px>
        <n-input
          ref="refInputUserName"
          v-model:value="formModel.username"
          autofocus
          clearable
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item path="password" label="密码" mb-20px>
        <n-input
          v-model:value="formModel.password"
          type="password"
          clearable
          autofocus
          show-password-on="click"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-button
        type="primary" :loading="loading"
        block text-color="white" @click="submit"
      >
        <span font-bold>登录</span>
      </n-button>
    </n-form>
  </n-card>
  <LoginTips />
</template>

<style scoped>
:deep(.n-input) {
  background-color: transparent;
  border: 1px solid var(--n-border-color);
  border-radius: 5px;
}
:deep(.n-divider .n-divider__title) {
  font-size: 12px;
}
:deep(.n-button) {
  background-color: var(--primary-color-hover);
  opacity: 0.75;
}
:deep(.n-button:hover) {
  background-color: var(--primary-color-pressed);
  opacity: 1;
}
</style>
