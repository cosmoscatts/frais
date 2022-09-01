<script setup lang="ts">
import {
  Refresh as RefreshIcon,
  RocketOutline as RocketOutlineIcon,
  Search as SearchIcon,
  TrashBinOutline as TrashBinOutlineIcon,
  TrendingUpSharp as TrendingUpSharpIcon,
} from '@vicons/ionicons5'
import Flash16Regular from '@vicons/fluent/Flash16Regular'
import type { SelectOption } from 'naive-ui'
import type { SearchModel } from '../helper.table'

const {
  showSearchForm = true,
  roleOptions = [],
} = defineProps<{
  /** 是否显示搜索栏 */
  showSearchForm?: boolean
  roleOptions?: SelectOption[]
}>()

const emits = defineEmits(['fetchTableData'])

// 是否隐藏 `form-label`
const labelHidden = useResponsiveFormLabelHidden

// 定义日期选择器值的格式
const datePickerValueFormatter = 'yyyy-MM-dd'

const baseSearchModel: SearchModel = {
  username: '',
  name: '',
  roleId: null,
  phone: '',
  createTime: null,
  updateTime: null,
}

// 搜索表单数据
const searchModel = ref<SearchModel>({ ...baseSearchModel })

/**
 * 禁用未来时间
 */
function disablePreviousDate(ts: number) {
  return ts > Date.now()
}

/**
 * 处理搜索表单的数据，同时这个方法会暴露给父级
 */
function getSearchParams() {
  const { value: model } = searchModel
  const cloneParams: SearchModel = JSON.parse(JSON.stringify(model))

  type K = keyof Pick<SearchModel, 'createTime' | 'updateTime'>
  const checkFields = ['createTime', 'updateTime']
  for (const [key, value] of Object.entries(cloneParams)) {
    if (!checkFields.includes(key) || (value?.length ?? 0) !== 2)
      continue
    const [start, end] = value
    if (start === end)
      cloneParams[key as K] = [`${start} 00:00:00`, `${end} 23:59:59`]
  }
  return cloneParams
}

/**
 * 根据筛选条件，搜索表格数据
 */
function searchTableData() {
  emits('fetchTableData', getSearchParams())
}
searchTableData()

/**
 * 重置搜索表单
 */
function resetSearchModel() {
  searchModel.value = { ...baseSearchModel }
}

defineExpose({
  getSearchParams,
})
</script>

<template>
  <n-collapse-transition :show="showSearchForm" ha>
    <n-grid :x-gap="18" :y-gap="8" :cols="24">
      <n-gi :span="22">
        <n-grid :x-gap="12" :y-gap="12" cols="1 s:2 l:3" responsive="screen">
          <n-gi :span="1">
            <n-form-item label="用户账号" label-placement="left" :show-label="!labelHidden" :show-feedback="false">
              <n-input v-model:value="searchModel.username" placeholder="用户账号" clearable>
                <template #clear-icon>
                  <n-icon :component="TrashBinOutlineIcon" />
                </template>
              </n-input>
            </n-form-item>
          </n-gi>
          <n-gi :span="1">
            <n-form-item label="用户名称" label-placement="left" :show-label="!labelHidden" :show-feedback="false">
              <n-input v-model:value="searchModel.name" placeholder="用户名称" clearable>
                <template #clear-icon>
                  <n-icon :component="TrashBinOutlineIcon" />
                </template>
              </n-input>
            </n-form-item>
          </n-gi>
          <n-gi :span="1">
            <n-form-item label="用户手机号" label-placement="left" :show-label="!labelHidden" :show-feedback="false">
              <n-input v-model:value="searchModel.phone" placeholder="用户手机号" clearable>
                <template #clear-icon>
                  <n-icon :component="TrashBinOutlineIcon" />
                </template>
              </n-input>
            </n-form-item>
          </n-gi>
          <n-gi :span="1">
            <n-form-item label="用户角色" label-placement="left" :show-label="!labelHidden" :show-feedback="false">
              <n-select v-model:value="searchModel.roleId" placeholder="用户角色" :options="roleOptions" clearable>
                <template #arrow>
                  <Flash16Regular />
                </template>
              </n-select>
            </n-form-item>
          </n-gi>
          <n-gi :span="1">
            <n-form-item label="创建时间" label-placement="left" :show-label="!labelHidden" :show-feedback="false">
              <n-date-picker
                v-model:formatted-value="searchModel.createTime" type="daterange"
                :value-format="datePickerValueFormatter" clearable :is-date-disabled="disablePreviousDate"
              >
                <template #separator>
                  <n-icon :size="16" :component="TrendingUpSharpIcon" />
                </template>
                <template #date-icon>
                  <n-icon :size="16" :component="RocketOutlineIcon" />
                </template>
              </n-date-picker>
            </n-form-item>
          </n-gi>
          <n-gi :span="1">
            <n-form-item label="更新时间" label-placement="left" :show-label="!labelHidden" :show-feedback="false">
              <n-date-picker
                v-model:formatted-value="searchModel.updateTime" type="daterange"
                :value-format="datePickerValueFormatter" clearable :is-date-disabled="disablePreviousDate"
              >
                <template #separator>
                  <n-icon :size="16" :component="TrendingUpSharpIcon" />
                </template>
                <template #date-icon>
                  <n-icon :size="16" :component="RocketOutlineIcon" />
                </template>
              </n-date-picker>
            </n-form-item>
          </n-gi>
        </n-grid>
      </n-gi>

      <n-gi :span="2">
        <n-grid :x-gap="12" :y-gap="12" cols="1" responsive="screen">
          <n-gi span="1">
            <div flex-y-center justify-end>
              <n-button type="primary" text-color="white" @click="searchTableData">
                <template #icon>
                  <n-icon :component="SearchIcon" color="white" />
                </template>
                <span font-bold>查询</span>
              </n-button>
            </div>
          </n-gi>
          <n-gi span="1">
            <div flex-y-center justify-end>
              <n-button secondary @click="resetSearchModel">
                <template #icon>
                  <n-icon :component="RefreshIcon" />
                </template>
                <span font-bold>重置</span>
              </n-button>
            </div>
          </n-gi>
        </n-grid>
      </n-gi>
    </n-grid>
  </n-collapse-transition>
</template>

