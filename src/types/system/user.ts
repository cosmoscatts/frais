import type { Role } from './role'

export interface User extends ModifyBase {
  id: number
  username: string
  name: string
  password?: string
  avatar?: string
  roleId: number
  role?: Role
}
