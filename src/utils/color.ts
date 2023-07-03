import { composite } from 'seemly'
import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'

extend([mixPlugin])

export type RGBA = [number, number, number, number]
export type RGB = [number, number, number]

export const createHoverColor = (color: string | RGB | RGBA) => composite(color, [255, 255, 255, 0.12])

export const createPressedColor = (color: string | RGB | RGBA) => composite(color, [0, 0, 0, 0.15])

export const addColorAlpha = (color: string, alpha: number) => colord(color).alpha(alpha).toHex()

export function useMixinColor(firstColor: string,
  secondColor: string,
  ratio: number) {
  return colord(firstColor).mix(secondColor, ratio).toHex()
}
