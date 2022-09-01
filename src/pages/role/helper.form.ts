import type { FormRules, TreeOption } from 'naive-ui'
import type { Role } from '~/types'

// 表单校验规则
export const rules: FormRules = {
  name: [
    {
      required: true,
      message: '请输入角色名称',
    },
  ],
  description: [
    {
      required: true,
      message: '请输入角色描述',
    },
  ],
  menuIdList: [
    {
      required: true,
      message: '请设置角色菜单权限',
    },
  ],
}

/** `form-action` 类型  */
export type RoleModalActionType = 'add' | 'edit'

// 默认的菜单树数据
export const defaultMenuTreeData: TreeOption[] = [
  {
    key: 101,
    label: '首页',
  },
  {
    key: 102,
    label: '系统管理',
    children: [
      {
        key: 10201,
        label: '用户管理',
      },
      {
        key: 10202,
        label: '角色管理',
      },
    ],
  },
]

/**
 * 统一处理保存角色功能
 */
export function handleSaveRole({
  type = 'add',
  data = {},
  tableData = [],
}: {
  type: RoleModalActionType
  data?: Role
  tableData?: Role[]
}) {
  const actionMap = {
    add: () => {
      tableData.push({ ...data })
    },
    edit: () => {
      const index = tableData.findIndex(i => i.id === data.id)
      tableData.splice(index, 1, { ...data })
    },
  }

  return actionMap[type]()
}
