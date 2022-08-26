import type { Role } from './role'

/**
 * 定义用户的数据类型
 */
export interface User {
  /** id */
  id?: number
  /** 账号 */
  username?: string
  /** 用户名称 */
  name?: string
  /** 密码 */
  password?: string
  /** 头像 */
  avatar?: string
  /** 手机号 */
  phone?: string
  /** 邮箱 */
  email?: string
  /** 角色 id */
  roleId?: number
  /** 角色 */
  role?: Role
  /** 创建时间 */
  createTime?: Date
  /** 更新时间 */
  updateTime?: Date
}
