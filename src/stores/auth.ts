import type { StoreDefinition } from 'pinia'
import type { Menu, User } from '~/types'
import { DEFAULT_AVATAR, IS_MOCK, MENUS } from '~/constants'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<Nullable<User>>(null)
  const menus = ref<Menu[]>(MENUS)
  const hasLogin = computed(() => !!user.value?.id)

  function updateUser<T extends User>(data: T) {
    data = Object.assign(user.value ?? {}, data)
    if (!data.avatar)
      data.avatar = DEFAULT_AVATAR
    user.value = data
  }
  function updateAvatar(avatar = DEFAULT_AVATAR) {
    if (!user.value)
      return
    user.value = {
      ...user.value,
      avatar,
    }
  }
  function removeUser() {
    user.value = null
  }
  function fetchMenus() {
    if (IS_MOCK) {
      menus.value = MENUS
      return
    }
    menus.value = []
  }
  function removeMenus() {
    menus.value = []
  }
  function login(data: User) {
    return new Promise((resolve) => {
      updateUser(data)
      fetchMenus()
      resolve(user.value)
    })
  }
  function logout() {
    return new Promise(() => {
      batchInvoke([removeUser, removeMenus])
    })
  }
  return {
    user,
    menus,
    hasLogin,
    login,
    logout,
    updateUser,
    updateAvatar,
  }
}, { persist: { enabled: true } })

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore as unknown as StoreDefinition, import.meta.hot))
