import type { FormRules } from 'naive-ui'
import type { User } from '~/types'

// 表单校验规则
export const rules: FormRules = {
  username: [
    {
      required: true,
      message: '请输入用户账号',
    },
  ],
  name: [
    {
      required: true,
      message: '请输入用户名称',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入用户密码',
    },
  ],
  checkPass: [
    {
      required: true,
      message: '请输入确认密码',
    },
  ],
  roleId: [
    {
      required: true,
      message: '请选择用户角色',
    },
  ],
}

/** `form-action` 类型  */
export type UserModalActionType = 'add' | 'edit'

/**
 * 统一处理保存角色功能
 */
export function handleSaveUser({
  type = 'add',
  data = {},
  tableData = [],
}: {
  type: UserModalActionType
  data?: User
  tableData?: User[]
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

