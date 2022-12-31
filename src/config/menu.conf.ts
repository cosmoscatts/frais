import type { Component } from 'vue'
import type { Menu } from '~/types'

type Source = 'front' | 'end'

interface MenuConfig {
  source: Source
  iconMap: { [key: string]: Component }
  defaultMenus: Menu[]
}

export const APP_MENU: MenuConfig = {
  source: 'front',
  iconMap: {},
  defaultMenus: [],
}
