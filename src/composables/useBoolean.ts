export function useBoolean(initValue = false) {
  const bool = ref(initValue)

  function setBool(value: boolean) {
    bool.value = value
  }

  function setTrue() {
    bool.value = true
  }

  function setFalse() {
    bool.value = false
  }

  function toggle() {
    setBool(!unref(bool))
  }

  return {
    bool,
    setBool,
    setTrue,
    setFalse,
    toggle,
  }
}
