<script setup lang="ts">
import { createTableColumns, createTableData } from './helper.table'

const { message } = useGlobalNaiveApi()
const pagination = usePagination({})

/**
 * 创建表格序号
 */
function createRowNumber(rowIndex: number) {
  const { page, pageSize } = pagination
  return (page - 1) * pageSize + rowIndex + 1
}

// 创建表格数据
const data = createTableData()
// 创建表格列信息
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
