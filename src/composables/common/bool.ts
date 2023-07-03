export function useBool(initValue = false) {
  const bool = ref(initValue)
  const setBool = (value: boolean) => bool.value = value
  return {
    bool,
    setBool,
    setTrue() {
      setBool(true)
    },
    setFalse() {
      setBool(false)
    },
    toggle() {
      setBool(!bool.value)
    },
  }
}
