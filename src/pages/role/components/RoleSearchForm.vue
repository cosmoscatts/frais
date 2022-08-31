<script setup lang="ts">
import { Refresh as RefreshIcon, Search as SearchIcon } from '@vicons/ionicons5'

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
  createTime?: Date
  /** 更新时间 */
  updateTime?: Date
}

const baseSearchModel: SearchModel = {
  name: '',
  createTime: undefined,
  updateTime: undefined,
}

const searchModel = ref<SearchModel>({ ...baseSearchModel })
</script>

<template>
  <n-collapse-transition :show="showSearchForm" ha>
    <n-grid :x-gap="12" :y-gap="8" :cols="24">
      <n-gi :span="20">
        <n-grid :x-gap="12" :y-gap="12" cols="1 s:2 l:3" responsive="screen">
          <n-gi :span="1">
            <n-form-item label="角色名称" label-placement="left" :show-feedback="false">
              <n-input v-model:value="searchModel.name" />
            </n-form-item>
          </n-gi>
          <n-gi :span="1">
            <n-form-item label="创建时间" label-placement="left" :show-feedback="false">
              <n-input v-model:value="searchModel.createTime" />
            </n-form-item>
          </n-gi>
          <n-gi :span="1">
            <n-form-item label="更新时间" label-placement="left" :show-feedback="false">
              <n-input v-model:value="searchModel.updateTime" />
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
              <n-button secondary :strong="true">
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
