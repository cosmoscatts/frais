export interface Role {
  id: number
  name: string // 角色名称
  description?: string // 角色描述
  createTime?: Date
  updateTime?: Date

  menuIdList?: number[] // 所拥有的的菜单项
}
