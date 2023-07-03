export function useLoading(initValue = false) {
  const { bool, setBool } = useBool(initValue)
  return {
    loading: bool,
    setLoading: setBool,
    startLoading() {
      setBool(true)
    },
    endLoading() {
      setBool(false)
    },
    toggleLoading() {
      setBool(!bool.value)
    },
    Loading: {
      get state() {
        return bool.value
      },
      set state(value: boolean) {
        setBool(value)
      },
      start() {
        setBool(true)
      },
      end() {
        setBool(false)
      },
      toggle() {
        setBool(!bool.value)
      },
    },
  }
}
