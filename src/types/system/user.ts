import type { Role } from './role'

export interface User {
  id: number
  name?: string // 名称
  avatar?: string // 头像
  roleId?: number // 角色 id
}

export interface UserDetail extends User {
  username: string // 账号
  phone?: string
  email?: string
  createTime?: Date
  updateTime?: Date

  role?: Role
}

export type UserRegister = Omit<UserDetail, 'role'> & {
  password?: string
}
