<script setup lang="ts">
import { Add as AddIcon } from '@vicons/ionicons5'
import type { SelectOption } from 'naive-ui'
import type { SearchModel } from './helper.table'
import { createRoleOptionsData, createTableColumns, createTableData } from './helper.table'
import UserSearchForm from './components/UserSearchForm.vue'
import UserFormModal from './components/UserFormModal.vue'
import type { UserModalActionType } from './helper.form'
import { handleSaveUser } from './helper.form'
import type { Role, User } from '~/types'

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
    useTimeoutFn(endLoading, 1000)
  }
}

/**
 * 创建表格序号
 */
function createRowNumber(rowIndex: number) {
  const { page, pageSize } = pagination
  return (page - 1) * pageSize + rowIndex + 1
}

// 是否显示『添加』、『编辑』用户表单
let userModalVisible = $ref(false)
// 用户表单操作类型 - `add`： 新增、`edit`：编辑
let userModalAction = $ref<UserModalActionType>()
// 编辑用户时，选中的用户
let selectedUser = $ref<User>()

/**
 * 添加用户
 */
function onAddUser() {
  selectedUser = {}
  userModalAction = 'add'
  userModalVisible = true
}

/**
 * 编辑用户
 */
function onUpdateUser(user: User) {
  selectedUser = user
  userModalAction = 'edit'
  userModalVisible = true
}

/**
 * 保存用户 -『新增』&『编辑』
 */
function onSaveUserData(user: User) {
  handleSaveUser({
    type: userModalAction,
    data: user,
    tableData,
  })
  useTimeoutFn(() => {
    message.success('保存成功')
    userModalVisible = false
  }, 1200)
}

/**
 * 删除用户
 */
function onRemoveUser(user: User) {
  dialog.warning({
    title: '警告',
    content: '你确定要删除该用户吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      tableData.splice(tableData.findIndex(i => i.id === user.id), 1)
      message.success('删除成功')
    },
  })
}

// 角色选择框数据
let roleOptions = $ref<SelectOption[]>()
function fetchRoleOptions() {
  roleOptions = createRoleOptionsData().map(({ id, name }: Role) => {
    return {
      label: name,
      value: id,
    }
  })
}
fetchRoleOptions()

/**
 * 将角色 `id` 转换为名称
 */
function transformRoleName(roleId = -1): string {
  return (roleOptions.find(i => i.value === roleId)?.label ?? '-') as string
}

// 创建表格列信息
const columns = createTableColumns({
  createRowNumber,
  transformRoleName,
  onUpdateUser,
  onRemoveUser,
})
</script>

<template>
  <div>
    <n-card title="查询用户">
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
        <n-button type="primary" text-color="white" @click="onAddUser">
          <template #icon>
            <n-icon :component="AddIcon" color="white" />
          </template>
          <span font-bold>新增</span>
        </n-button>
      </template>
      <UserSearchForm
        ref="refSearchForm" mb-20px
        :show-search-form="showSearchForm"
        :role-options="roleOptions"
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
    <UserFormModal
      v-model:modal-visible="userModalVisible"
      :type="userModalAction"
      :form="selectedUser"
      :role-options="roleOptions"
      @save-user-data="onSaveUserData"
    />
  </div>
</template>
