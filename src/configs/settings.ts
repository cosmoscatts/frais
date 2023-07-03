export interface Settings {
  layout: 'vertical' | 'horizontal' | 'vertical-mix' | 'horizontal-mix'
  showLogo: boolean
  showTabs: boolean
  showFoot: boolean
  fixNav: boolean

  showPageHeader: boolean
  showPageHeaderIcon: boolean

  showAnimation: boolean
  animationMode: string

  primaryColor: string

  cacheTabs: boolean
  tabShapeStyle: 'button' | 'chrome'

  invertMenu: boolean
  sideCollapsedTriggerStyle: 'bar' | 'arrow-circle'
}

export const defaultSettings: Settings = {
  /**
   * 布局模式
   *
   * @value
   *  'vertical' - 左侧菜单模式
   *  'horizontal' - 顶部菜单模式
   *  'vertical-mix' - 左侧菜单混合模式
   *  'horizontal-mix' - 顶部菜单混合模式
   */
  layout: 'vertical-mix',
  showLogo: true,
  showTabs: true,
  showFoot: true,
  fixNav: true,

  showPageHeader: true,
  showPageHeaderIcon: true,

  showAnimation: true,
  /**
   * 页面切换动画类型
   *
   * @value | 'fade-slide' | 'fade' | 'fade-bottom' | 'fade-scale' | 'zoom-fade' | 'zoom-out'
   */
  animationMode: 'fade-slide',

  primaryColor: '#34C759',

  cacheTabs: true,
  tabShapeStyle: 'button',

  invertMenu: false,
  sideCollapsedTriggerStyle: 'bar',
}
