interface ExtraSettings {
  showAppSettings: boolean
  cacheAppSettings: boolean
  defaultThemeMode: 'auto' | 'light' | 'dark'
}

interface ConfigSettings {
  layout: 'vertical' | 'horizontal'
  showLogo: boolean
  showTabs: boolean
  showFoot: boolean
  fixNav: boolean

  showAnimation: boolean
  animationMode: string

  invertMenu: boolean
  primaryColor: string

  cacheTabs: boolean
  tabShapeStyle: 'default' | 'chrome'

  sideCollapsedTriggerStyle: 'bar' | 'arrow-circle'
}

export type Settings = ConfigSettings & ExtraSettings

export const APP_SETTINGS: Settings = {
  // ----- EXTRA SETTINGS -----

  showAppSettings: true, // 是否显示【页面设置】按钮
  cacheAppSettings: true, // 是否缓存【页面设置】
  defaultThemeMode: 'auto', // 页面主题的亮暗模式

  // ----- CONFIG SETTINGS -----

  layout: 'vertical',
  showLogo: true,
  showTabs: true,
  showFoot: true,
  fixNav: true,

  showAnimation: true,
  // 页面切换动画类型
  //  - | 'fade-slide' | 'fade' | 'fade-bottom' |
  //  - | 'fade-scale' | 'zoom-fade' | 'zoom-out' |
  animationMode: 'fade-slide',

  invertMenu: false,
  primaryColor: '#377BB5',

  cacheTabs: true,
  tabShapeStyle: 'chrome',

  sideCollapsedTriggerStyle: 'bar',
}
