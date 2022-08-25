import { commonDark, commonLight, useThemeVars } from 'naive-ui'

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
