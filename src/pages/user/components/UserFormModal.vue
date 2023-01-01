<script setup lang="ts">
import type { FormItemInst, FormItemRule, SelectOption } from 'naive-ui'
import {
  Glasses as GlassesIcon,
  GlassesOutline as GlassesOutlineIcon,
  TrashBinOutline as TrashBinOutlineIcon,
} from '@vicons/ionicons5'
import Flash16Regular from '@vicons/fluent/Flash16Regular'
import { createRules } from '../form'
import type { User } from '~/types'

type FormModel = Omit<User, 'createTime' | 'updateTime' | 'role'> & { reenteredPassword?: string }

const { roleOptions = [] } = defineProps<{ roleOptions?: SelectOption[] }>()
const emits = defineEmits(['saveData'])

const segmented = {
  content: 'soft',
  footer: 'soft',
} as const

const baseFormModel: FormModel = {
  id: undefined,
  username: '',
  name: '',
  password: '',
  reenteredPassword: '',
  avatar: undefined,
  roleId: undefined,
}
const refForm = ref()
const form = useFormModal<FormModel, User>(baseFormModel, refForm, emits)
watch(form.visible, form.openModalCb)

const refRPasswordFormItem = ref<FormItemInst | null>(null)
const handlePasswordInput = () => {
  if (form.formData.reenteredPassword) {
    refRPasswordFormItem.value?.validate({ trigger: 'password-input' })
  }
}
const validatePasswordStartWith = (
  _rule: FormItemRule,
  value: string,
) => (
  !!form.formData.password
    && form.formData.password.startsWith(value)
    && form.formData.password.length >= value.length
)
const validatePasswordSame = (_rule: FormItemRule, value: string) => value === form.formData.password
const rules = createRules(
  validatePasswordStartWith,
  validatePasswordSame,
)

defineExpose({ form })
</script>

<template>
  <n-modal
    :show="form.props.visible"
    :title="['新增用户', '编辑用户'][Number(form.props.type === 'edit')]"
    size="huge"
    style="width: 650px;"
    preset="card" :bordered="false"
    :segmented="segmented"
    :mask-closable="false"
    transform-origin="center"
    :on-esc="form.closeModal"
    :on-close="form.closeModal"
  >
    <n-form
      ref="refForm"
      :model="form.formData"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      :show-require-mark="false"
      :style="{
        maxWidth: '600px',
      }"
    >
      <n-form-item label="用户账号" path="username">
        <n-input v-model:value="form.formData.username" placeholder="请输入用户账号" clearable>
          <template #clear-icon>
            <n-icon :component="TrashBinOutlineIcon" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item label="用户名称" path="name">
        <n-input v-model:value="form.formData.name" placeholder="请输入用户名称" clearable>
          <template #clear-icon>
            <n-icon :component="TrashBinOutlineIcon" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item v-if="form.props.type === 'add'" label="用户密码" path="password">
        <n-input
          v-model:value="form.formData.password"
          type="password" placeholder="请输入用户密码" clearable
          show-password-on="click" @input="handlePasswordInput"
          @keydown.enter.prevent
        >
          <template #clear-icon>
            <n-icon :component="TrashBinOutlineIcon" />
          </template>
          <template #password-visible-icon>
            <n-icon :size="16" :component="GlassesOutlineIcon" />
          </template>
          <template #password-invisible-icon>
            <n-icon :size="16" :component="GlassesIcon" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item
        v-if="form.props.type === 'add'"
        ref="refRPasswordFormItem"
        first
        label="重复密码"
        path="reenteredPassword"
      >
        <n-input
          v-model:value="form.formData.reenteredPassword"
          :disabled="!form.formData.password" show-password-on="click"
          type="password" placeholder="请输入重复密码" clearable
          @keydown.enter.prevent
        >
          <template #clear-icon>
            <n-icon :component="TrashBinOutlineIcon" />
          </template>
          <template #password-visible-icon>
            <n-icon :size="16" :component="GlassesOutlineIcon" />
          </template>
          <template #password-invisible-icon>
            <n-icon :size="16" :component="GlassesIcon" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item label="用户角色" path="roleId">
        <n-select v-model:value="form.formData.roleId" placeholder="请选择用户角色" :options="roleOptions" clearable>
          <template #arrow>
            <Flash16Regular />
          </template>
        </n-select>
      </n-form-item>
    </n-form>
    <template #footer>
      <div flex-c gap-x-5>
        <n-button type="primary" :loading="form.props.loading" text-color="white" @click="form.handleOk">
          <span font-bold>保存</span>
        </n-button>
        <n-button type="error" text-color="white" @click="form.closeModal">
          <span font-bold>取消</span>
        </n-button>
      </div>
    </template>
  </n-modal>
</template>
