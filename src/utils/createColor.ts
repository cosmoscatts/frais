import { composite } from 'seemly'
import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'

extend([mixPlugin])

export type RGBA = [number, number, number, number]
export type RGB = [number, number, number]

export function createHoverColor(color: string | RGB | RGBA) {
  return composite(color, [255, 255, 255, 0.12])
}
export function createPressedColor(color: string | RGB | RGBA) {
  return composite(color, [0, 0, 0, 0.15])
}
/**
 * 给颜色加透明度
 * @param color - 颜色
 * @param alpha - 透明度(0 - 1)
 */
export function addColorAlpha(color: string, alpha: number) {
  return colord(color).alpha(alpha).toHex()
}
