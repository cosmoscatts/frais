import { NButton, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { Role } from '~/types'
import { dayJs } from '~/composables/useGlobalPlugin'

/**
 * 生成表格的列
 */
export function createTableColumns({
  createRowNumber,
  onUpdateRole,
}: {
  createRowNumber?: (rowIndex: number) => number
  onUpdateRole?: (role: Role) => void
}): DataTableColumns<Role> {
  return [
    {
      key: 'id',
      title: '序号',
      render(_row, rowIndex) {
        return createRowNumber?.(rowIndex)
      },
    },
    {
      key: 'name',
      title: '角色名称',
    },
    {
      key: 'description',
      title: '角色描述',
    },
    {
      key: 'createTime',
      title: '创建时间',
      render({ createTime }) {
        return formatDate(createTime)
      },
    },
    {
      key: 'updateTime',
      title: '更新时间',
      render({ updateTime }) {
        return formatDate(updateTime)
      },
    },
    {
      key: 'actions',
      title: '操作',
      render(row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => onUpdateRole?.(row),
          },
          { default: () => '编辑' },
        )
      },
    },
  ]
}

/**
 * 生成表格数据
 */
export function createTableData(): Role[] {
  return [
    {
      id: 1,
      name: '管理员',
      description: '拥有管理员权限，可以对普通用户进行一些操作',
      createTime: new Date(),
      updateTime: new Date(),
    },
    {
      id: 2,
      name: '用户',
      description: '拥有普通用户权限，可以查看基础页面',
      createTime: new Date(),
      updateTime: new Date(),
    },
  ]
}

function formatDate(date?: Date) {
  return dayJs(date).format('YYYY-MM-DD HH:mm:ss') || '-'
}
