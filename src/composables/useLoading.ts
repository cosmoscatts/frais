/**
 * 封装加载状态
 */
export function useLoading(initValue = false) {
  const {
    bool: loading,
    setTrue: startLoading,
    setFalse: endLoading,
    toggleBool: toggleLoading,
  } = useBoolean(initValue)

  return {
    loading,
    startLoading,
    endLoading,
    toggleLoading,
  }
}
