export interface Menu {
  id: number
  key: string | number
  label: string
  icon: string
  path?: string
  children?: Menu[]
}
