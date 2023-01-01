import { NButton, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { FormattedValue } from 'naive-ui/es/date-picker/src/interface'
import type { User } from '~/types'
import defaultAvatar from '~/assets/default-avatar.jpg'

export interface SearchModel {
  username?: string
  name?: string
  roleId?: number | null
  createTime: FormattedValue | null
  updateTime: FormattedValue | null
}

export interface SearchParmas extends SearchModel {
  page?: number
  pageSize?: number
}

export function createTableColumns({
  createRowNumber,
  transformRoleName,
  onUpdateUser,
  onRemoveUser,
}: {
  createRowNumber?: (rowIndex: number) => number
  transformRoleName?: (roleId?: number) => string
  onUpdateUser?: (user: User) => void
  onRemoveUser?: (user: User) => void
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
          default: () => username || '',
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
      key: 'phone',
      title: '手机号',
      align: 'center',
    },
    {
      key: 'email',
      title: '邮箱',
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
              onClick: () => onUpdateUser?.(row),
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
              onClick: () => onRemoveUser?.(row),
            },
            { default: () => '删除' },
          ),
        ],
      ),
    },
  ]
}

export function createTableData() {
  return {
    data: {
      total: 2,
      records: Array.from({ length: 15 }).map((_, idx) => ({
        id: idx + 1,
        username: `user${idx + 1}`,
        name: `小刚${idx + 1}`,
        avatar: defaultAvatar,
        phone: '66666666666',
        email: 'dajiahao@163.com',
        roleId: ~~(Math.random() * 3) + 1,
        createTime: new Date(),
        updateTime: new Date(),
      })),
    },
  }
}

export function createRoleOptionsData() {
  return Array.from({ length: 3 }).map((_, idx) => ({
    id: idx + 1,
    name: ['管理员', '用户', '用户2'][idx],
    description: [
      '拥有管理员权限，可以对普通用户进行一些操作',
      '拥有普通用户权限，可以查看基础页面',
      '拥有普通用户权限，可以查看基础页面',
    ][idx],
    createTime: new Date(),
    updateTime: new Date(),
    menuIdList: [
      [101, 102, 10201, 10202],
      [101],
      [101, 10201],
    ][idx],
  }))
}
