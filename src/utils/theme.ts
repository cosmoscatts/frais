export function getAppWhetherDark(themeMode: string) {
  return themeMode === 'system'
    ? ''
    : themeMode === 'dark'
}
