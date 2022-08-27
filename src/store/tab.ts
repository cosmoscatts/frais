export const tabStore = defineStore(
  'tabStore',
  () => {
    const tabs = ref()
    const cachedPageNames = ref()

    return {
      tabs,
      cachedPageNames,
    }
  },
)
