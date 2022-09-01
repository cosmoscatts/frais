<script setup lang="ts">
import { Add as AddIcon } from '@vicons/ionicons5'
import type { SearchModel } from './helper.table'
import { createTableColumns, createTableData } from './helper.table'
import UserSearchForm from './components/UserSearchForm.vue'
import type { User } from '~/types'

const { message, dialog } = useGlobalNaiveApi()

// 是否显示搜索栏
const showSearchForm = ref(true)

// 分页参数
const pagination = usePagination({
  onChangeCallback,
  onUpdatePageSizeCallback,
})

// 定义表格数据
let tableData = $ref<User[]>([])
// 表格加载状态
const { loading, startLoading, endLoading } = useLoading()

/** 搜索参数包含搜索表单参数和分页参数 */
interface SearchParmas extends SearchModel {
  page?: number
  pageSize?: number
}

// 搜索栏元素
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

// 是否显示『添加』、『编辑』角色表单
let roleModalVisible = $ref(false)
// 角色表单操作类型 - `add`： 新增、`edit`：编辑
let roleModalAction = $ref<RoleModalActionType>()
// 编辑角色时，选中的角色
let selectedRole = $ref<User>()

/**
 * 添加角色
 */
function onAddRole() {
  selectedRole = {}
  roleModalAction = 'add'
  roleModalVisible = true
}

/**
 * 编辑角色
 */
function onUpdateUser(user: User) {
  selectedRole = user
  roleModalAction = 'edit'
  roleModalVisible = true
}

/**
 * 保存角色 -『新增』&『编辑』
 */
function onSaveRoleData(user: User) {
  handleSaveRole({
    type: roleModalAction,
    data: user,
    tableData,
  })
  useTimeoutFn(() => {
    message.success('保存成功')
    roleModalVisible = false
  }, 1200)
}

/**
 * 删除角色
 */
function onRemoveUser(role: User) {
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
  onUpdateUser,
  onRemoveUser,
})
</script>

<template>
  <div>
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
        <n-button type="primary" text-color="white" @click="onAddRole">
          <template #icon>
            <n-icon :component="AddIcon" color="white" />
          </template>
          <span font-bold>新增</span>
        </n-button>
      </template>
      <UserSearchForm
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
    <!-- <RoleFormModal
      v-model:modal-visible="roleModalVisible"
      :type="roleModalAction"
      :form="selectedRole"
      :menu-tree-data="defaultMenuTreeData"
      @save-role-data="onSaveRoleData"
    /> -->
  </div>
</template>
