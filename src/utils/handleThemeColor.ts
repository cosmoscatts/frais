import { commonDark, commonLight } from 'naive-ui'
import { addColorAlpha, createHoverColor, createPressedColor } from '~/utils'

const ALPHA = 0.8

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
 * 生成主色调的其他状态颜色，包括 `hover`、`pressed`、`suppl` 等状态
 */
export function generatePrimaryColor(_primaryColor: string) {
  return {
    primaryColor: _primaryColor,
    primaryColorHover: createHoverColor(_primaryColor),
    primaryColorPressed: createPressedColor(_primaryColor),
    primaryColorSuppl: addColorAlpha(_primaryColor, ALPHA),
  }
}

/**
 * 将 `naive ui` 的通用颜色，并写入 `body`
 */
export function setNaiveUiCommonColors(_primaryColorMap: { [key: string]: string }) {
  const colors: any = isDark.value
    ? commonDark
    : commonLight

  const mergedColors = {
    ...colors,
    ..._primaryColorMap,
  }
  Object.entries(colorPropertyMap).forEach(([key, value]) => {
    document.body.style.setProperty(value, mergedColors[key])
  })
}

