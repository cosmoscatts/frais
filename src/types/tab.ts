export interface Tab {
  id: number // id
  title: string // 多页签名称
  name: string // 路由名称
  icon?: string // 图标
  path: string // 路由
  cached?: boolean // 是否缓存
}
