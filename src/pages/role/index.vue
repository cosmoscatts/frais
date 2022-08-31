<script setup lang="ts">
import { Add as AddIcon } from '@vicons/ionicons5'
import type { SearchModel } from './helper.table'
import { createTableColumns, createTableData } from './helper.table'
import RoleSearchForm from './components/RoleSearchForm.vue'
import type { Role } from '~/types'

const { message } = useGlobalNaiveApi()

// 是否显示搜索栏
const showSearchForm = ref(true)

// 分页参数
const pagination = usePagination({})

/**
 * 创建表格序号
 */
function createRowNumber(rowIndex: number) {
  const { page, pageSize } = pagination
  return (page - 1) * pageSize + rowIndex + 1
}

/**
 * 添加角色
 */
function onAddRole() {
  message.success('添加成功')
}

/**
 * 编辑角色
 */
function onUpdateRole() {
  message.success('编辑成功')
}

// 创建表格列信息
const columns = createTableColumns({
  createRowNumber,
  onUpdateRole,
})

// 定义表格数据
let tableData = $ref<Role[]>([])
// 表格加载状态
const { loading, startLoading, endLoading } = useLoading()

/** 搜索参数包含搜索表单参数和分页参数 */
interface SearchParmas extends SearchModel {
  page?: number
  pageSize?: number
}

/**
 * 查询表格数据，分两种情况：
 *    1）搜索栏调用会传 `SearchModel`
 *    2）分页调用会传 `{ page, pageSize }` 和 `SearchModel`
 */
function fetchTableData(searchParams: SearchParmas) {
  startLoading()
  // 合并默认分页参数
  const { page, pageSize } = pagination
  searchParams = { page, pageSize, ...searchParams }
  try {
    const { data: { records, total } } = createTableData()
    tableData = records
    pagination.page = searchParams.page!
    pagination.itemCount = total
  }
  catch (err) {
    // 处理异常
  }
  finally {
    useTimeoutFn(() => {
      endLoading()
    }, 1000)
  }
}
</script>

<template>
  <n-card title="查询角色">
    <template #header-extra>
      <n-switch v-model:value="showSearchForm" :round="false" size="large" mr-3>
        <template #checked-icon>
          🤩
        </template>
        <template #unchecked-icon>
          🤔
        </template>
        <template #checked>
          <span font-bold>折叠搜索栏</span>
        </template>
        <template #unchecked>
          <span font-bold>展开搜索栏</span>
        </template>
      </n-switch>
      <n-button type="success" @click="onAddRole">
        <template #icon>
          <n-icon :component="AddIcon" color="white" />
        </template>
        <span text-white font-bold>新增</span>
      </n-button>
    </template>
    <RoleSearchForm :show-search-form="showSearchForm" mb-20px @fetch-table-data="fetchTableData" />
    <n-data-table
      :loading="loading"
      :bordered="false"
      :columns="columns"
      :data="tableData"
      :pagination="pagination"
    />
  </n-card>
</template>
