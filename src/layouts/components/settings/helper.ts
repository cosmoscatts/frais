/**
 * 配置项组件渲染类型
 */
export type SettingItemRenderType = 'layoutRadio' | 'select' | 'switch'

/**
 * 配置项渲染结构
 */
export interface SettingItem {
  /** 字段属性 */
  prop: string
  /** 配置项名称 */
  name?: string
  /** 配置项渲染组件类型 */
  type: SettingItemRenderType
  /** 配置项可配置的值 */
  options?: any
  /** 依赖于其他配置项 */
  dependOn?: string
}

// 设置项分类 (12)
// 页面布局 - `layout` | `fixNav` | `showLogo` | `showTabs` | `showFoot` (5)
// 主色调 - `themePrimaryColor` (1)
// 页面功能 - `showTransitionAnimation` | `transitionAnimation` | `tabShapeStyle` |
//           | `cacheTabs` | `invertMenu` | `sideCollapsedTriggerStyle` (6)

/**
 * 页面布局配置项
 */
export const layoutSettings: SettingItem[] = [
  {
    prop: 'layout',
    name: '布局模式',
    type: 'layoutRadio',
    options: [
      { label: '垂直模式', value: 'vertical' },
      { label: '水平模式', value: 'horizontal' },
    ],
    dependOn: undefined,
  },
  {
    prop: 'fixNav',
    name: '是否固定导航栏',
    type: 'switch',
    options: undefined,
    dependOn: undefined,
  },
  {
    prop: 'showLogo',
    name: '是否显示 Logo',
    type: 'switch',
    options: undefined,
    dependOn: undefined,
  },
  {
    prop: 'showTabs',
    name: '是否显示多页签',
    type: 'switch',
    options: undefined,
    dependOn: undefined,
  },
  {
    prop: 'showFoot',
    name: '是否显示底部栏',
    type: 'switch',
    options: undefined,
    dependOn: undefined,
  },
]

/**
 * 主色调配置项
 */
export const primaryColorOption = {

}

/**
 * 页面功能配置项
 */
export const funcOptions = [

]
