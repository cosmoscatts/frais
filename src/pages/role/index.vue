<script setup lang="ts">
import { Add as AddIcon } from '@vicons/ionicons5'
import { createTableColumns, createTableData } from './helper.table'

const { message } = useGlobalNaiveApi()

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

// 创建表格数据
const data = createTableData()
// 创建表格列信息
const columns = createTableColumns({
  createRowNumber,
  onUpdateRole,
})
</script>

<template>
  <n-card title="查询角色">
    <template #header-extra>
      <n-button type="success" @click="onAddRole">
        <template #icon>
          <n-icon :component="AddIcon" color="white" />
        </template>
        <span text-white font-bold>新增</span>
      </n-button>
    </template>
    <n-card size="medium" :bordered="true">
      卡片内容
    </n-card>
    <n-data-table
      :bordered="false"
      :columns="columns"
      :data="data"
      :pagination="pagination"
    />
  </n-card>
</template>
