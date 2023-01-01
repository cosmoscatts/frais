<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { TrashBinOutline as TrashBinOutlineIcon } from '@vicons/ionicons5'
import type { User } from '~/types'

type FormModel = Pick<User, 'id' | 'name'>

const {
  currentTab = 1,
} = defineProps<{
  currentTab?: number
}>()

const authStore = useAuthStore()
const refForm = ref<FormInst | null>(null)

const getBaseFormModel = () => {
  const { id, name = '' } = G.clone<User>(authStore.user!)
  return {
    id,
    name,
  }
}

let formModel = $ref<FormModel>(getBaseFormModel())

const resetFormModel = () => {
  formModel = getBaseFormModel()
  refForm.value?.restoreValidation()
}

watch(() => currentTab, resetFormModel)

const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名称',
    },
  ],
}

const { loading, startLoading, endLoading } = useLoading()

function onSubmit(e: MouseEvent) {
  e.preventDefault()
  refForm.value?.validate((errors) => {
    if (errors) return
    startLoading()
    useTimeoutFn(() => {
      authStore.updateUser({
        ...G.clone(authStore.user),
        ...formModel,
      })
      endLoading()
      $message.success('修改成功')
    }, 1500)
  })
}
</script>

<template>
  <n-form
    ref="refForm"
    :model="formModel"
    :rules="rules"
    label-placement="left"
    label-width="auto"
    :show-require-mark="false"
    :style="{
      maxWidth: '600px',
      margin: 'auto',
      paddingTop: '15px',
    }"
  >
    <n-form-item label="用户名称" path="name">
      <n-input v-model:value="formModel.name" placeholder="请输入用户名称" clearable>
        <template #clear-icon>
          <n-icon :component="TrashBinOutlineIcon" />
        </template>
      </n-input>
    </n-form-item>

    <div flex-c>
      <n-button
        type="primary" :loading="loading" text-color="white"
        :style="{ marginRight: '15px' }" @click="onSubmit"
      >
        <span font-bold>保存</span>
      </n-button>
      <n-button type="error" text-color="white" @click="resetFormModel">
        <span font-bold>重置</span>
      </n-button>
    </div>
  </n-form>
</template>
