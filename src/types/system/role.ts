export interface Role extends ModifyBase {
  id: number
  name: string
  menuIdList?: number[]
  description?: string
}
