import { commonDark, commonLight, useThemeVars } from 'naive-ui'

import type { GlobalThemeOverrides } from 'naive-ui'
// import { cloneDeep } from 'lodash-es'
// import { themeSetting } from '@/settings'
// import { EnumStorageKey } from '@/enum'
// import { addColorAlpha, getColorPalette, getLocal, getThemeColor, removeLocal, setLocal } from '@/utils'

const colorPropertyMap: { [key: string]: string } = {
  primaryColor: '--primary-color',
  primaryColorHover: '--primary-color-hover',
  primaryColorPressed: '--primary-color-pressed',
  primaryColorSuppl: '--primary-color-suppl',
  infoColor: '--info-color',
  infoColorHover: '--info-color-hover',
  infoColorPressed: '--info-color-pressed',
  infoColorSuppl: '--info-color-suppl',
  warningColor: '--warning-color',
  warningColorHover: '--warning-color-hover',
  warningColorPressed: '--warning-color-pressed',
  warningColorSuppl: '--warning-color-suppl',
  errorColor: '--error-color',
  errorColorHover: '--error-color-hover',
  errorColorPressed: '--error-color-pressed',
  errorColorSuppl: '--error-color-suppl',
  successColor: '--success-color',
  successColorHover: '--success-color-hover',
  successColorPressed: '--success-color-pressed',
  successColorSuppl: '--success-color-suppl',
}

/**
 * 将 naive ui 的通用颜色，并写入 body
 */
function setNaiveUiCommonColors(_primaryColorMap: { [key: string]: string }) {
  const colors: any = isDark.value
    ? commonDark
    : commonLight

  // console.log(colors)
  // console.log(_primaryColorMap)
  const mergedColors = {
    ...colors,
    ..._primaryColorMap,
  }
  Object.entries(colorPropertyMap).forEach(([key, value]) => {
    document.body.style.setProperty(value, mergedColors[key])
  })
}

export function changeThemePrimaryColor(_color?: string) {
  const themeVars = useThemeVars().value
  console.log('themeVars', themeVars)
  const {
    primaryColor,
    primaryColorHover,
    primaryColorPressed,
    primaryColorSuppl,
  } = themeVars
  const primaryColorMap = {
    primaryColor,
    primaryColorHover,
    primaryColorPressed,
    primaryColorSuppl,
  }
  setNaiveUiCommonColors(primaryColorMap)
}

/** 初始化主题配置 */
// export function initThemeSettings() {
//   const isProd = import.meta.env.PROD
//   // 生产环境才缓存主题配置，本地开发实时调整配置更改配置的json
//   const storageSettings = getThemeSettings()
//   if (isProd && storageSettings)
//     return storageSettings

//   const themeColor = getThemeColor() || themeSetting.themeColor
//   const info = themeSetting.isCustomizeInfoColor ? themeSetting.otherColor.info : getColorPalette(themeColor, 7)
//   const otherColor = { ...themeSetting.otherColor, info }
//   const setting = cloneDeep({ ...themeSetting, themeColor, otherColor })
//   return setting
// }

// type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'error'
// type ColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active'
// type ColorKey = `${ColorType}Color${ColorScene}`
// type ThemeColor = Partial<Record<ColorKey, string>>

// interface ColorAction {
//   scene: ColorScene
//   handler: (color: string) => string
// }

// /** 获取主题颜色的各种场景对应的颜色 */
// function getThemeColors(colors: [ColorType, string][]) {
//   const colorActions: ColorAction[] = [
//     { scene: '', handler: color => color },
//     { scene: 'Suppl', handler: color => color },
//     { scene: 'Hover', handler: color => getColorPalette(color, 5) },
//     { scene: 'Pressed', handler: color => getColorPalette(color, 7) },
//     { scene: 'Active', handler: color => addColorAlpha(color, 0.1) },
//   ]

//   const themeColor: ThemeColor = {}

//   colors.forEach((color) => {
//     colorActions.forEach((action) => {
//       const [colorType, colorValue] = color
//       const colorKey: ColorKey = `${colorType}Color${action.scene}`
//       themeColor[colorKey] = action.handler(colorValue)
//     })
//   })

//   return themeColor
// }

// /** 获取naive的主题颜色 */
// export function getNaiveThemeOverrides(colors: Record<ColorType, string>): GlobalThemeOverrides {
//   const { primary, success, warning, error } = colors

//   const info = themeSetting.isCustomizeInfoColor ? colors.info : getColorPalette(primary, 7)

//   const themeColors = getThemeColors([
//     ['primary', primary],
//     ['info', info],
//     ['success', success],
//     ['warning', warning],
//     ['error', error],
//   ])

//   const colorLoading = primary

//   return {
//     common: {
//       ...themeColors,
//     },
//     LoadingBar: {
//       colorLoading,
//     },
//   }
// }
