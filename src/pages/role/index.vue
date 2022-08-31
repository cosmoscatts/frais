<script setup lang="ts">
import { createTableColumns, createTableData } from './helper.table'

const { message } = useGlobalNaiveApi()
const pagination = usePagination({})

function createRowNumber(rowIndex: number) {
  const { page, pageSize } = pagination
  return (page - 1) * pageSize + rowIndex + 1
}

const data = createTableData()
const columns = createTableColumns({
  createRowNumber,
})
</script>

<template>
  <div text-lg font-bold>
    角色管理
    <n-data-table
      :bordered="false"
      :columns="columns"
      :data="data"
      :pagination="pagination"
    />
  </div>
</template>
