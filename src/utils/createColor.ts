import { composite } from 'seemly'

export type RGBA = [number, number, number, number]
export type RGB = [number, number, number]

export function createHoverColor(color: string | RGB | RGBA) {
  return composite(color, [255, 255, 255, 0.16])
}
export function createPressedColor(color: string | RGB | RGBA) {
  return composite(color, [0, 0, 0, 0.12])
}
