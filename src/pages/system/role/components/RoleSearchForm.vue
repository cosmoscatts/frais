<script setup lang="ts">
const emit = defineEmits<{
  (event: 'search'): void
}>()
function getBase() {
  return {
    name: '',
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
      <n-form-item label="角色名称" label-placement="left" :show-feedback="false">
        <n-input v-model:value="formModel.name" placeholder="角色名称" clearable />
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
