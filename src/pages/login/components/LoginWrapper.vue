<script setup lang="ts">
import AccountForm from './AccountForm.vue'
import PhoneForm from './PhoneForm.vue'
import type { TabValue } from './interfaces'
import { APP_META } from '~/config'

const refAccountForm = ref()
const refPhoneForm = ref()
const currentTabValue = ref<TabValue>('account')
const inputAutoFocus = () => [refAccountForm, refPhoneForm][Number(currentTabValue.value === 'phone')].value?.focusFirstInput()
watch(currentTabValue, () => useTimeoutFn(inputAutoFocus, 200))

onMounted(() => useTimeoutFn(() => {
  inputAutoFocus()
  useLottie({
    containerId: '#lottie',
    path: 'https://assets2.lottiefiles.com/packages/lf20_iVPQC8jyX2.json',
  })
}, 50))
</script>

<template>
  <div flex-col-c p-10 rounded-1>
    <div text="28px center" font-bold flex-y-c>
      {{ APP_META.name }}
    </div>
    <div id="lottie" h120px />

    <n-tabs
      v-model:value="currentTabValue"
      size="large"
      animated
    >
      <n-tab-pane name="account" tab="账号密码">
        <AccountForm ref="refAccountForm" />
      </n-tab-pane>
      <n-tab-pane name="phone" tab="手机号">
        <PhoneForm ref="refPhoneForm" />
      </n-tab-pane>
    </n-tabs>

    <div flex="~ col" wfull>
      <n-divider>
        其他登录方式
      </n-divider>
      <div wfull flex-c gap-x-5>
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-button color="#44006F" circle>
              <template #icon>
                <div i-ri-github-fill text-white />
              </template>
            </n-button>
          </template>
          <span> Github 登录 </span>
        </n-tooltip>
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-button color="#12B7F5" circle>
              <template #icon>
                <div i-ri-qq-fill text-white />
              </template>
            </n-button>
          </template>
          <span> QQ 登录 </span>
        </n-tooltip>
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-button color="#04D167" circle>
              <template #icon>
                <div i-ri-wechat-fill text-white />
              </template>
            </n-button>
          </template>
          <span> 微信登录 </span>
        </n-tooltip>
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-button color="#F25D8E" circle>
              <template #icon>
                <div i-ri-bilibili-fill text-white />
              </template>
            </n-button>
          </template>
          <span> 小破站登录 </span>
        </n-tooltip>
      </div>
      <div wfull flex-c mt15px>
        <DarkToggle />
      </div>
    </div>
  </div>
</template>
