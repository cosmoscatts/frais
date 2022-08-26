/**
 * 定义菜单项的数据类型
 */
export interface Menu {
  id: number
  label: string
  icon?: string
  path?: string
  children?: Menu[]
}
