import colorJson from './color.traditional.json'

export const COMMON_COLORS = [
  '#1890ff',
  '#409EFF',
  '#2d8cf0',
  '#007AFF',
  '#5ac8fa',
  '#5856D6',
  '#536dfe',
  '#9c27b0',
  '#AF52DE',
  '#0096c7',
  '#00C1D4',
  '#34C759',
  '#43a047',
  '#7cb342',
  '#c0ca33',
  '#78DEC7',
  '#e53935',
  '#d81b60',
  '#f4511e',
  '#fb8c00',
  '#ffb300',
  '#fdd835',
  '#6d4c41',
  '#546e7a',
]

export interface TraditionalColorDetail {
  label: string
  color: string
}

export interface TraditionalColor {
  label: string
  data: TraditionalColorDetail[]
}

export const TRADITIONAL_COLORS = colorJson as TraditionalColor[]

export function isInTraditionalColors(color: string) {
  return TRADITIONAL_COLORS.some(i => i.data.some(v => v.color === color))
}
