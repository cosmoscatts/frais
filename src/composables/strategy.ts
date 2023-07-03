export const strategy = {
  some(fns: [boolean, Function][]) {
    fns.some(([f, fn]) => {
      if (f)
        fn()
      return f
    })
  },

  someHasReturn<R = any>(fns: [boolean, Function][]): R | null {
    for (const [f, fn] of fns) {
      if (!f)
        continue
      return fn()
    }
    return null
  },

  each(fns: [boolean, Function][]): void {
    fns.forEach(([f, fn]) => {
      if (f)
        fn()
    })
  },
}
