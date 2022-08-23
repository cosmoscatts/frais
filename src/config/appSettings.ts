/**
 * 是否显示 app 设置抽屉
 *
 * @default true
 */
export const showAppSettings = true
/**
 * 是否缓存 app 设置
 *
 * @default true
 */
export const cacheAppSettings = true
/**
 * 默认亮暗模式
 *  - 'dark': 暗色
 *  - 'light': 亮色
 *  - 'system': 跟随系统
 *
 * @default: 'system'
 */
export const defaultThemeMode = 'system'

/**
 * app 配置对象的类型
 */
export interface ConfigSettingObject {
  layout: 'vertical' | 'horizontal'
  showLogo: boolean
  showTabs: boolean
  showTransitionAnimation: boolean
  fixNav: boolean
  themePrimaryColor: string
  transitionAnimation: string
  cacheTabs: boolean
  tabShapeStyle: 'default' | 'chrome'
  invertMenu: boolean
}

export const configSettings: ConfigSettingObject = {
  /**
   * 布局
   *  - 'vertical': '垂直布局'
   *  - 'horizontal': '水平布局'
   *
   * @default 'vertical'
   */
  layout: 'vertical',
  /**
   * 是否显示 logo
   *
   * @default true
   */
  showLogo: true,
  /**
   * 是否显示多页签
   *
   * @default true
   */
  showTabs: true,
  /**
   * 是否显示页面切换动画
   *
   * @default true
   */
  showTransitionAnimation: true,
  /**
   * 是否固定 nav 导航栏
   *
   * @default true
   */
  fixNav: true,
  /**
   * 主题主要色调
   *
   * @default: '#63E2B7'
   */
  themePrimaryColor: '#63E2B7',
  /**
   * 页面切换动画类型
   *
   * @default
   */
  transitionAnimation: 'slide',
  /**
   * 是否缓存多页签
   *
   * @default true
   */
  cacheTabs: true,
  /**
   * 多页签风格
   *  - 'default': 默认按钮风格
   *  - 'chrome': 谷歌风格
   *
   * @default 'chrome'
   */
  tabShapeStyle: 'chrome',
  /**
   * 菜单反转色
   *
   * @default false
   */
  invertMenu: false,
}
