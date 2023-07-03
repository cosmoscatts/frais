import { NButton, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { User } from '~/types'

export function createColumns({
  createRowNumber,
  transformRoleName,
  onUpdate,
  onRemove,
}: {
  createRowNumber?: (rowIndex: number) => number
  transformRoleName?: (roleId?: number) => string
  onUpdate?: (user?: User) => void
  onRemove?: (user: User) => void
}): DataTableColumns<User> {
  return [
    {
      key: 'id',
      title: '序号',
      align: 'center',
      render: (_row, rowIndex) => createRowNumber?.(rowIndex),
    },
    {
      key: 'username',
      title: '账号',
      align: 'center',
      render: ({ username }) => h(
        NTag,
        {
          type: 'info',
          style: { fontWeight: 'bold' },
        },
        {
          default: () => nonNullStr(username),
        },
      ),
    },
    {
      key: 'name',
      title: '名称',
      align: 'center',
    },
    {
      key: 'roleId',
      title: '角色',
      align: 'center',
      render: ({ roleId }) => h(
        NTag,
        {
          type: 'warning',
          style: { fontWeight: 'bold' },
        },
        {
          default: () => transformRoleName?.(roleId),
        },
      ),
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
