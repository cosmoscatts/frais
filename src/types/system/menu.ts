export interface Menu {
  id: number
  label: string
  path?: string
  icon?: string
  children?: Menu[]
}
