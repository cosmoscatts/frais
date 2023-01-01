<script setup lang="ts">
import { Add as AddIcon } from '@vicons/ionicons5'
import type { SelectOption } from 'naive-ui'
import type { SearchParmas } from './table'
import { createRoleOptionsData, createTableColumns, createTableData } from './table'
import UserSearchForm from './components/UserSearchForm.vue'
import UserFormModal from './components/UserFormModal.vue'
import type { Role, User } from '~/types'

let tableData = $ref<User[]>([])
const { loading, startLoading, endLoading } = useLoading()
const refSearchForm = ref()
const showSearchForm = ref(true) // 是否显示搜索栏
const refModal = ref()
const pagination = usePagination({ // 分页参数
  onUpdatePageCb,
  onUpdatePageSizeCb,
})

const searchParams = () => refSearchForm.value?.getSearchParams() ?? {}
function onUpdatePageCb() {
  const { page, pageSize } = pagination
  fetchTableData({
    ...searchParams(),
    page,
    pageSize,
  })
}
function onUpdatePageSizeCb() {
  const { page, pageSize } = pagination
  fetchTableData({
    ...searchParams(),
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

const openModal = (type: 'add' | 'edit' = 'add', data?: User) => refModal.value?.form.openModal(type, data)
const onUpdateUser = (data?: Role) => openModal('edit', data)

function onSaveData(data: User) {
  const add = () => tableData.push({ ...data })
  const edit = () => {
    const index = tableData.findIndex(i => i.id === data.id)
    tableData.splice(index, 1, { ...data })
  }
  ;[add, edit][Number(refModal.value?.form.props.type === 'edit')]()
  useTimeoutFn(() => {
    $message.success('保存成功')
    refModal.value?.form.closeModal()
  }, 500)
}

function onRemoveUser(user: User) {
  $dialog.warning({
    title: '警告',
    content: '你确定要删除该用户吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      tableData.splice(tableData.findIndex(i => i.id === user.id), 1)
      $message.success('删除成功')
    },
  })
}

let roleOptions = $ref<SelectOption[]>([])
const fetchRoleOptions = () => roleOptions = createRoleOptionsData().map(({ id, name }: Role) => ({
  value: id,
  label: name,
}))
fetchRoleOptions()
const transformRoleName = (roleId = -1) =>
  (roleOptions.find(i => i.value === roleId)?.label ?? '-') as string

const columns = createTableColumns({ // 创建表格列信息
  transformRoleName,
  onUpdateUser,
  onRemoveUser,
  createRowNumber: pagination.createRowNumber,
})
</script>

<template>
  <div>
    <n-card title="查询用户">
      <template #header-extra>
        <n-switch v-model:value="showSearchForm" :round="false" size="large" mr-3>
          <template #checked-icon>
            🧸
          </template>
          <template #unchecked-icon>
            🐌
          </template>
          <template #checked>
            <span font-bold>折叠搜索栏</span>
          </template>
          <template #unchecked>
            <span font-bold>展开搜索栏</span>
          </template>
        </n-switch>
        <n-button type="primary" text-color="white" @click="openModal()">
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
      ref="refModal"
      :role-options="roleOptions"
      @save-data="onSaveData"
    />
  </div>
</template>
