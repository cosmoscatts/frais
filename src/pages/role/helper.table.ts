import { NButton, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { FormattedValue } from 'naive-ui/es/date-picker/src/interface'
import type { Role } from '~/types'

/** 定义搜索表单结构 */
export interface SearchModel {
  /** 角色名称 */
  name?: string
  /** 创建时间 */
  createTime: FormattedValue | null
  /** 更新时间 */
  updateTime: FormattedValue | null
}

/**
 * 生成表格的列
 */
export function createTableColumns({
  createRowNumber,
  onUpdateRole,
  onRemoveRole,
}: {
  createRowNumber?: (rowIndex: number) => number
  onUpdateRole?: (role: Role) => void
  onRemoveRole?: (role: Role) => void
}): DataTableColumns<Role> {
  return [
    {
      key: 'id',
      title: '序号',
      align: 'center',
      render(_row, rowIndex) {
        return createRowNumber?.(rowIndex)
      },
    },
    {
      key: 'name',
      title: '角色名称',
      align: 'center',
      render({ name }) {
        return h(
          NTag,
          {
            type: 'info',
            style: { fontWeight: 'bold' },
          },
          {
            default: () => name || '',
          },
        )
      },
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
      render({ createTime }) {
        return formatDate(createTime)
      },
    },
    {
      key: 'updateTime',
      title: '更新时间',
      align: 'center',
      render({ updateTime }) {
        return formatDate(updateTime)
      },
    },
    {
      key: 'actions',
      title: '操作',
      align: 'center',
      render(row) {
        return h(
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
                onClick: () => onUpdateRole?.(row),
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
                onClick: () => onRemoveRole?.(row),
              },
              { default: () => '删除' },
            ),
          ],
        )
      },
    },
  ]
}

/**
 * 生成表格数据
 */
export function createTableData() {
  return {
    data: {
      total: 2,
      records: [
        {
          id: 1,
          name: '管理员',
          description: '拥有管理员权限，可以对普通用户进行一些操作',
          createTime: new Date(),
          updateTime: new Date(),
          menuIdList: [101, 102, 10201, 10202],
        },
        {
          id: 2,
          name: '用户',
          description: '拥有普通用户权限，可以查看基础页面',
          createTime: new Date(),
          updateTime: new Date(),
          menuIdList: [101],
        },
        {
          id: 3,
          name: '用户2',
          description: '拥有普通用户权限，可以查看基础页面',
          createTime: new Date(),
          updateTime: new Date(),
          menuIdList: [101, 10201],
        },
      ],
    },
  }
}

/**
 * 格式化时间
 */
function formatDate(date?: Date) {
  return dayJs(date).format('YYYY-MM-DD HH:mm:ss') || '-'
}
