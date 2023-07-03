import { darkTheme } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
import { DEFAULT_DARK_MODE } from '~/constants'
import { createBodyColors, createPrimaryColor, createThemeMode } from '~/utils'

export const isDark = createThemeMode(DEFAULT_DARK_MODE)

export const nTheme = computed(() => [null, darkTheme][Number(isDark.value)])

export const nThemeOverrides = (() => {
  return computed<GlobalThemeOverrides>(() => {
    const uiStore = useUiStore()
    const primaryColorOverrides = createPrimaryColor(uiStore.settings.primaryColor)
    return {
      common: {
        ...primaryColorOverrides,
        borderColor: ['#E5E6EB', '#484849'][Number(isDark.value)],
      },
      LoadingBar: { colorLoading: uiStore.settings.primaryColor },
    }
  })
})()

function handleDarkChange() {
  const uiStore = useUiStore()
  createBodyColors(uiStore.settings.primaryColor)
}
watch(isDark, handleDarkChange)

export function toggleDark(event: MouseEvent) {
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    isDark.value = !isDark.value
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })
  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: isDark.value
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 300,
          easing: 'ease-out',
          pseudoElement: isDark.value
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
}
