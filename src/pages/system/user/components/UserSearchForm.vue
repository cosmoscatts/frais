<script setup lang="ts">
const emit = defineEmits<{
  (event: 'search'): void
}>()
function getBase() {
  return {
    username: '',
    name: '',
    roleId: null,
    createTime: null,
    updateTime: null,
  }
}
const {
  formModel,
  reset,
  getSearchFormParams,
} = useSearchForm(getBase)
function search() {
  emit('search')
}
defineExpose({ getSearchFormParams })
</script>

<template>
  <CommonSearchForm v-bind="{ formModel, search, reset, ...$attrs }">
    <n-gi :span="8">
      <n-form-item label="用户账号" label-placement="left" :show-feedback="false">
        <n-input v-model:value="formModel.username" placeholder="用户账号" clearable />
      </n-form-item>
    </n-gi>
    <n-gi :span="8">
      <n-form-item label="用户名称" label-placement="left" :show-feedback="false">
        <n-input v-model:value="formModel.name" placeholder="用户名称" clearable />
      </n-form-item>
    </n-gi>
    <n-gi :span="8">
      <n-form-item label="用户角色" label-placement="left" :show-feedback="false">
        <n-select v-model:value="formModel.roleId" placeholder="用户角色" :options="O.options('role')" clearable />
      </n-form-item>
    </n-gi>
    <n-gi :span="8">
      <n-form-item label="创建时间" label-placement="left" :show-feedback="false">
        <n-date-picker
          v-model:formatted-value="formModel.createTime" type="daterange"
          :value-format="datePickerValueFormatter" clearable w-full :is-date-disabled="disablePreviousDate"
        />
      </n-form-item>
    </n-gi>
    <n-gi :span="8">
      <n-form-item label="更新时间" label-placement="left" :show-feedback="false">
        <n-date-picker
          v-model:formatted-value="formModel.updateTime" type="daterange"
          :value-format="datePickerValueFormatter" clearable w-full :is-date-disabled="disablePreviousDate"
        />
      </n-form-item>
    </n-gi>
  </CommonSearchForm>
</template>
