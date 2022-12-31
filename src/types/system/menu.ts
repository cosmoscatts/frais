export interface Menu {
  id: number
  label: string
  icon?: string
  path?: string
  children?: Menu[]
}
