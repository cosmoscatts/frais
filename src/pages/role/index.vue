<script setup lang="ts">
import { Add as AddIcon } from '@vicons/ionicons5'
import type { SearchModel } from './helper.table'
import { createTableColumns, createTableData } from './helper.table'
import RoleSearchForm from './components/RoleSearchForm.vue'
import type { Role } from '~/types'

const { message, dialog } = useGlobalNaiveApi()

// 是否显示搜索栏
const showSearchForm = ref(true)

// 分页参数
const pagination = usePagination({
  onChangeCallback,
  onUpdatePageSizeCallback,
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

/** 搜索栏元素 */
const refSearchForm = ref()

/**
 * 改变页码的回调方法
 */
function onChangeCallback() {
  const { page, pageSize } = pagination
  const searchParams = refSearchForm.value?.getSearchParams()
  fetchTableData({
    ...searchParams,
    page,
    pageSize,
  })
}

/**
 * 改变每页条数的回调方法
 */
function onUpdatePageSizeCallback() {
  const { page, pageSize } = pagination
  const searchParams = refSearchForm.value?.getSearchParams()
  fetchTableData({
    ...searchParams,
    page,
    pageSize,
  })
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

/**
 * 删除角色
 */
function onRemoveRole(role: Role) {
  dialog.warning({
    title: '警告',
    content: '你确定要删除该用户吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      tableData.splice(tableData.findIndex(i => i.id === role.id), 1)
      message.success('删除成功')
    },
  })
}

// 创建表格列信息
const columns = createTableColumns({
  createRowNumber,
  onUpdateRole,
  onRemoveRole,
})
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
      <n-button type="primary" @click="onAddRole">
        <template #icon>
          <n-icon :component="AddIcon" color="white" />
        </template>
        <span text-white font-bold>新增</span>
      </n-button>
    </template>
    <RoleSearchForm
      ref="refSearchForm" mb-20px
      :show-search-form="showSearchForm"
      @fetch-table-data="fetchTableData"
    />
    <n-data-table
      :loading="loading"
      :bordered="false"
      :columns="columns"
      :data="tableData"
      :pagination="pagination"
    />
  </n-card>
</template>
