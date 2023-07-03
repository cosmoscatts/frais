import { type ThemeCommonVars, commonDark, commonLight } from 'naive-ui'
import { addColorAlpha, createHoverColor, createPressedColor } from './color'
import { THEME_MODE_KEY } from '~/constants'

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

export function createPrimaryColor(primaryColor: string) {
  return {
    primaryColor,
    primaryColorHover: createHoverColor(primaryColor),
    primaryColorPressed: createPressedColor(primaryColor),
    primaryColorSuppl: addColorAlpha(primaryColor, ALPHA),
  }
}

export function createBodyColors(primaryColor: string) {
  const colors: ThemeCommonVars = isDark.value
    ? commonDark
    : commonLight
  const mergedColors = {
    ...colors,
    ...createPrimaryColor(primaryColor),
  } as ThemeCommonVars
  Object.entries(colorPropertyMap).forEach(([key, value]) => {
    document.body.style.setProperty(value, mergedColors[key as keyof ThemeCommonVars])
  })
}

export function createThemeMode(mode: 'auto' | 'light' | 'dark') {
  if (!localStorage.getItem(THEME_MODE_KEY)) {
    if (mode === 'auto') {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      localStorage.setItem(THEME_MODE_KEY,
        prefersDark
          ? 'dark'
          : 'light',
      )
    }
    else {
      localStorage.setItem(THEME_MODE_KEY, mode)
    }
  }
  return useDark({
    storageKey: THEME_MODE_KEY,
    valueDark: 'dark',
    valueLight: 'light',
  })
}
