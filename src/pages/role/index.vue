<script setup lang="ts">
import { Add as AddIcon } from '@vicons/ionicons5'
import type { SearchParmas } from './table'
import { createTableColumns, createTableData } from './table'
import RoleSearchForm from './components/RoleSearchForm.vue'
import RoleFormModal from './components/RoleFormModal.vue'
import type { Role } from '~/types'
import { APP_MENU } from '~/config'

let tableData = $ref<Role[]>([])
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

const openModal = (type: 'add' | 'edit' = 'add', data?: Role) => refModal.value?.form.openModal(type, data)
const onUpdateRole = (data?: Role) => openModal('edit', data)

function onSaveData(data: Role) {
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

function onRemoveRole(role: Role) {
  $dialog.warning({
    title: '警告',
    content: '你确定要删除该角色吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      tableData.splice(tableData.findIndex(i => i.id === role.id), 1)
      $message.success('删除成功')
    },
  })
}

const columns = createTableColumns({ // 创建表格列信息
  onUpdateRole,
  onRemoveRole,
  createRowNumber: pagination.createRowNumber,
})

const defaultMenuTreeData = computed(() => {
  return APP_MENU.defaultMenus.map(i => ({
    value: i.id,
    label: i.label,
    children: i.children?.map(j => ({
      value: j.id,
      label: j.label,
    })),
  }))
})
</script>

<template>
  <div>
    <n-card title="查询角色">
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
    <RoleFormModal
      ref="refModal"
      :menu-tree-data="defaultMenuTreeData"
      @save-data="onSaveData"
    />
  </div>
</template>
