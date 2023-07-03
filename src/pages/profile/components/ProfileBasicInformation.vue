<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import type { User } from '~/types'

const { currentTab } = defineProps<{ currentTab: number }>()

const message = useMessage()
const authStore = useAuthStore()

const refForm = ref<FormInst | null>(null)

function getBase() {
  const user = clone(authStore.user!)
  return {
    id: user.id,
    name: nonNullStr(user.name),
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
    useTimeoutFn(() => {
      authStore.updateUser(formModel)
      endLoading()
      message.success('修改成功')
    }, 1500)
  })
}

const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名称',
    },
  ],
}
</script>

<template>
  <CommonForm ref="refForm" :model="formModel" :rules="rules" :style="{ margin: 'auto', paddingTop: '15px', minHeight: '250px' }">
    <n-form-item label="用户名称" path="name">
      <n-input v-model:value="formModel.name" placeholder="请输入用户名称" clearable />
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
