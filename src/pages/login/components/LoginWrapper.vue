<script setup lang="ts">
import AccountForm from './AccountForm.vue'
import PhoneForm from './PhoneForm.vue'
import { appMeta } from '~/config'
</script>

<template>
  <div flex="center col" p-10 rounded-3>
    <div text="32px center" font-bold flex-y-center>
      <div flex-center h-36px w-36px bg="[var(--primary-color)]" rounded-1 mr-3>
        <div i-ri-vip-crown-2-fill text="20px white" />
      </div>
      <span font-bold text-36px>{{ appMeta.name }}</span>
    </div>

    <n-tabs
      mt-20px
      default-value="account"
      size="large"
      animated
    >
      <n-tab-pane name="account" tab="账号密码">
        <AccountForm />
      </n-tab-pane>
      <n-tab-pane name="phone" tab="手机号">
        <PhoneForm />
      </n-tab-pane>
    </n-tabs>

    <div flex="~ col" w-full mt-30px>
      <n-divider>
        其他登录方式
      </n-divider>
      <div w-full flex-center gap-x-5>
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
    </div>
  </div>
</template>
