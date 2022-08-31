<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { NButton, NTag, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

interface RowData {
  key: number
  name: string
  age: number
  address: string
  tags: string[]
}

const createColumns = ({
  sendMail,
}: {
  sendMail: (rowData: RowData) => void
}): DataTableColumns<RowData> => {
  return [
    {
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Age',
      key: 'age',
    },
    {
      title: 'Address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      render(row) {
        const tags = row.tags.map((tagKey) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px',
              },
              type: 'info',
              bordered: false,
            },
            {
              default: () => tagKey,
            },
          )
        })
        return tags
      },
    },
    {
      title: 'Action',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => sendMail(row),
          },
          { default: () => 'Send Email' },
        )
      },
    },
  ]
}

const createData = (): RowData[] => [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['wow'],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

const { message } = useGlobalNaiveApi()
const data = createData()
const columns = createColumns({
  sendMail(rowData) {
    message.info(`send mail to ${rowData.name}`)
  },
})
const pagination = usePagination({})
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
