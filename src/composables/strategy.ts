export const strategy = {
  some(fns: [boolean, () => void][]) {
    fns.some(([f, fn]) => {
      if (f)
        fn()
      return f
    })
  },

  someHasReturn<R = any>(fns: [boolean, () => R][]): R | null {
    for (const [f, fn] of fns) {
      if (!f)
        continue
      return fn()
    }
    return null
  },

  each(fns: [boolean, () => void][]): void {
    fns.forEach(([f, fn]) => {
      if (f)
        fn()
    })
  },
}
