<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { TrashBinOutline as TrashBinOutlineIcon } from '@vicons/ionicons5'
import type { User } from '~/types'

const {
  currentTab = 1,
} = defineProps<{
  /** 当前 `tab` */
  currentTab?: number
}>()

// `form` 表单元素
const refForm = ref<FormInst | null>(null)

type FormModel = Pick<User, 'id' | 'name' | 'phone' | 'email'>

const { user } = storeToRefs(useUserStore())

/**
 * 获取表单数据
 */
function getBaseFormModel(): FormModel {
  const { value: _user } = user
  const { id, name, phone, email } = JSON.parse(JSON.stringify(_user)) as User
  return {
    id,
    name,
    phone,
    email,
  }
}

/**
 * 重置表单数据及校验状态
 */
function resetFormModel() {
  getBaseFormModel()
  refForm.value && refForm.value.restoreValidation()
}

const formModel = $ref<FormModel>(getBaseFormModel())

// 当 `tab` 改变，重置表单及校验
watch(() => currentTab, resetFormModel)

// 表单校验规则
const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名称',
    },
  ],
}

const { loading, startLoading, endLoading } = useLoading()

/**
 * 保存修改内容
 */
function onSubmit() {

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
    <n-form-item label="手机号" path="phone">
      <n-input v-model:value="formModel.phone" placeholder="请输入手机号" clearable>
        <template #clear-icon>
          <n-icon :component="TrashBinOutlineIcon" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item label="用户邮箱" path="email">
      <n-input v-model:value="formModel.email" placeholder="请输入用户邮箱" clearable>
        <template #clear-icon>
          <n-icon :component="TrashBinOutlineIcon" />
        </template>
      </n-input>
    </n-form-item>

    <div flex-center>
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
