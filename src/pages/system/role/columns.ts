import { NButton, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { Role } from '~/types'

export function createColumns({
  createRowNumber,
  onUpdate,
  onRemove,
}: {
  createRowNumber?: (rowIndex: number) => number
  onUpdate?: (role?: Role) => void
  onRemove?: (role: Role) => void
}): DataTableColumns<Role> {
  return [
    {
      key: 'id',
      title: '序号',
      align: 'center',
      render: (_, rowIndex) => createRowNumber?.(rowIndex),
    },
    {
      key: 'name',
      title: '角色名称',
      align: 'center',
      render: ({ name }) => h(
        NTag,
        {
          type: 'info',
          style: { fontWeight: 'bold' },
        },
        {
          default: () => name || '',
        },
      ),
    },
    {
      key: 'description',
      title: '角色描述',
      align: 'center',
    },
    {
      key: 'createTime',
      title: '创建时间',
      align: 'center',
      render: ({ createTime }) => formatDate(createTime),
    },
    {
      key: 'updateTime',
      title: '更新时间',
      align: 'center',
      render: ({ updateTime }) => formatDate(updateTime),
    },
    {
      key: 'actions',
      title: '操作',
      align: 'center',
      render: row => h(
        'div',
        {},
        [
          h(
            NButton,
            {
              size: 'small',
              secondary: true,
              type: 'warning',
              style: { marginRight: '10px', fontWeight: 'bold' },
              onClick: () => onUpdate?.(row),
            },
            { default: () => '编辑' },
          ),
          h(
            NButton,
            {
              size: 'small',
              secondary: true,
              type: 'error',
              style: { fontWeight: 'bold' },
              onClick: () => onRemove?.(row),
            },
            { default: () => '删除' },
          ),
        ],
      ),
    },
  ]
}
