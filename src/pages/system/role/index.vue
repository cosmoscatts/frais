<script setup lang="ts">
import RoleSearchForm from './components/RoleSearchForm.vue'
import RoleModal from './components/RoleModal.vue'
import { createColumns } from './columns'
import IconAdd from '~icons/carbon/add'
import type { Role } from '~/types'

const dialog = useDialog()
const message = useMessage()

const refSearchForm = ref()
const refModal = ref()
const showSearchForm = ref(true)

const {
  pagination,
  createRowNumber,
} = usePagination({ fetchTableData })
const {
  modalType,
  modalVisible,
  selectedItem,
  showModal,
  closeModal,
} = useControlModal()

const { Loading } = useLoading()

let tabledata = $ref<Role[]>([])
function fetchTableData() {
  Loading.start()
  RoleApi.list()
    .then(({ data: { records = [], total = 0 } }) => {
      tabledata = records
      pagination.itemCount = total
    }).finally(() => useTimeoutFn(Loading.end, 1000))
}
fetchTableData()

function saveData() {
  message.success('保存成功')
  closeModal()
}

const columns = createColumns({
  createRowNumber,
  onUpdate(data?: Role) {
    showModal({ type: 'edit', data })
  },
  onRemove({ id }: Role) {
    dialog.warning({
      title: '警告',
      content: '你确定要删除该角色吗？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        message.success('删除成功')
      },
    })
  },
})
</script>

<template>
  <div>
    <n-card title="查询角色">
      <template #header-extra>
        <n-switch v-model:value="showSearchForm" :round="false" size="large" mr-3>
          <template #checked>
            <span font-bold>折叠搜索栏</span>
          </template>
          <template #unchecked>
            <span font-bold>展开搜索栏</span>
          </template>
        </n-switch>
        <n-button type="primary" text-color="white">
          <template #icon>
            <n-icon :component="IconAdd" color="white" />
          </template>
          <span font-bold>新增</span>
        </n-button>
      </template>
      <RoleSearchForm ref="refSearchForm" :show="showSearchForm" />
    </n-card>

    <n-card mt-15px>
      <n-data-table
        :loading="Loading.state"
        :bordered="false"
        :columns="columns"
        :data="tabledata"
        :pagination="pagination"
        :paginate-single-page="false"
      />
    </n-card>

    <RoleModal
      ref="refModal"
      v-model:visible="modalVisible"
      v-bind="{ type: modalType, data: selectedItem }"
      @save-data="saveData"
    />
  </div>
</template>
