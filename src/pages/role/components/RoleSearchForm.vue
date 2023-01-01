<script setup lang="ts">
import {
  Refresh as RefreshIcon,
  RocketOutline as RocketOutlineIcon,
  Search as SearchIcon,
  TrashBinOutline as TrashBinOutlineIcon,
  TrendingUpSharp as TrendingUpSharpIcon,
} from '@vicons/ionicons5'
import type { SearchModel } from '../table'

const {
  showSearchForm = true,
} = defineProps<{
  showSearchForm?: boolean
}>()
const emits = defineEmits(['fetchTableData'])

const datePickerValueFormatter = 'yyyy-MM-dd'
const baseSearchModel: SearchModel = {
  name: '',
  createTime: null,
  updateTime: null,
}
const searchModel = ref<SearchModel>({ ...baseSearchModel })

const disablePreviousDate = (ts: number) => ts > Date.now()
const getSearchParams = () => {
  const clone: SearchModel = G.clone(searchModel.value)
  type K = keyof Pick<SearchModel, 'createTime' | 'updateTime'>
  const checkFields = ['createTime', 'updateTime']
  Object.entries(clone).forEach(([key, value]) => {
    if (checkFields.includes(key) && value?.length === 2) {
      const [start, end] = value
      if (start === end) {
        clone[key as K] = [`${start} 00:00:00`, `${end} 23:59:59`]
      }
    }
  })
  return clone
}
const searchTableData = () => emits('fetchTableData', getSearchParams())
const resetSearchModel = () => searchModel.value = { ...baseSearchModel }
searchTableData()
defineExpose({ getSearchParams })
</script>

<template>
  <n-collapse-transition :show="showSearchForm" ha>
    <n-grid :x-gap="18" :y-gap="8" :cols="24">
      <n-gi :span="20">
        <n-grid :x-gap="12" :y-gap="12" cols="1 s:2 l:3" responsive="screen">
          <n-gi :span="1">
            <n-form-item label="角色名称" label-placement="left" :show-label="!labelHidden" :show-feedback="false">
              <n-input v-model:value="searchModel.name" placeholder="角色名称" clearable>
                <template #clear-icon>
                  <n-icon :component="TrashBinOutlineIcon" />
                </template>
              </n-input>
            </n-form-item>
          </n-gi>
          <n-gi :span="1">
            <n-form-item label="创建时间" label-placement="left" :show-label="!labelHidden" :show-feedback="false">
              <n-date-picker
                v-model:formatted-value="searchModel.createTime" type="daterange"
                :value-format="datePickerValueFormatter" clearable w-full
                :is-date-disabled="disablePreviousDate"
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
                :value-format="datePickerValueFormatter" clearable w-full
                :is-date-disabled="disablePreviousDate"
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

      <n-gi :span="4">
        <n-grid :x-gap="12" :y-gap="12" cols="1 l:2 xxl:3" responsive="screen">
          <n-gi span="0 s:1" offset="0 xxl:1">
            <div flex-y-c justify-end>
              <n-button type="primary" text-color="white" @click="searchTableData">
                <template #icon>
                  <n-icon :component="SearchIcon" color="white" />
                </template>
                <span font-bold>查询</span>
              </n-button>
            </div>
          </n-gi>
          <n-gi span="0 s:1">
            <div flex-y-c justify-end>
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
