<script setup lang="ts">
import { Refresh as RefreshIcon, Search as SearchIcon } from '@vicons/ionicons5'
import type { FormattedValue } from 'naive-ui/es/date-picker/src/interface'

const {
  showSearchForm = true,
} = defineProps<{
  /** 是否显示搜索栏 */
  showSearchForm?: boolean
}>()

/** 定义搜索表单结构 */
interface SearchModel {
  /** 角色名称 */
  name?: string
  /** 创建时间 */
  createTime?: FormattedValue
  /** 更新时间 */
  updateTime?: FormattedValue
}

/** 定义日期选择器值的格式 */
const datePickerValueFormatter = 'yyyy-MM-dd'

const baseSearchModel: SearchModel = {
  name: '',
  createTime: undefined,
  updateTime: undefined,
}

/** 搜索表单数据 */
const searchModel = ref<SearchModel>({ ...baseSearchModel })

/**
 * 禁用未来时间
 */
function disablePreviousDate(ts: number) {
  return ts > Date.now()
}

function resetSearchModel() {
  searchModel.value = { ...baseSearchModel }
}
</script>

<template>
  <n-collapse-transition :show="showSearchForm" ha>
    <n-grid :x-gap="12" :y-gap="8" :cols="24">
      <n-gi :span="20">
        <n-grid :x-gap="12" :y-gap="12" cols="1 s:2 l:3" responsive="screen">
          <n-gi :span="1">
            <n-form-item label="角色名称" label-placement="left" :show-feedback="false">
              <n-input v-model:value="searchModel.name" clearable />
            </n-form-item>
          </n-gi>
          <n-gi :span="1">
            <n-form-item label="创建时间" label-placement="left" :show-feedback="false">
              <n-date-picker
                v-model:formatted-value="searchModel.createTime" type="daterange"
                :value-format="datePickerValueFormatter" clearable
                :is-date-disabled="disablePreviousDate"
              />
            </n-form-item>
          </n-gi>
          <n-gi :span="1">
            <n-form-item label="更新时间" label-placement="left" :show-feedback="false">
              <n-date-picker
                v-model:formatted-value="searchModel.updateTime" type="daterange"
                :value-format="datePickerValueFormatter" clearable
                :is-date-disabled="disablePreviousDate"
              />
            </n-form-item>
          </n-gi>
        </n-grid>
      </n-gi>

      <n-gi :span="4">
        <n-grid :x-gap="12" :y-gap="12" cols="1 l:2" responsive="screen">
          <n-gi span="0 s:1">
            <div flex-y-center justify-end>
              <n-button type="primary">
                <template #icon>
                  <n-icon :component="SearchIcon" color="white" />
                </template>
                <span text-white font-bold>查询</span>
              </n-button>
            </div>
          </n-gi>
          <n-gi span="0 s:1">
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
