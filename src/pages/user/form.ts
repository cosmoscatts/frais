import type { FormItemRule, FormRules } from 'naive-ui'

export function createRules(
  validatePasswordStartWith: (rule: FormItemRule, value: string) => boolean,
  validatePasswordSame: (rule: FormItemRule, value: string) => boolean,
): FormRules {
  return {
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
    reenteredPassword: [
      {
        required: true,
        message: '请再次输入密码',
        trigger: ['input', 'blur'],
      },
      {
        validator: validatePasswordStartWith,
        message: '两次密码输入不一致',
        trigger: 'input',
      },
      {
        validator: validatePasswordSame,
        message: '两次密码输入不一致',
        trigger: ['blur', 'password-input'],
      },
    ],
    roleId: [
      {
        required: true,
        message: '请选择用户角色',
      },
    ],
  }
}
