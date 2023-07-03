import type { UnwrapRef } from 'vue'

type ModalAction = 'add' | 'edit'

export function useControlModal<T = any>() {
  const modalType = ref<ModalAction>('add')
  const modalVisible = ref(false)
  const selectedItem = ref<T | null>(null)

  const showModal = ({ type = 'add', data = null }: { type?: ModalAction; data?: T | null }) => {
    modalType.value = type
    selectedItem.value = data as UnwrapRef<T>
    modalVisible.value = true
  }

  const closeModal = () => modalVisible.value = false

  return {
    modalType,
    modalVisible,
    selectedItem,
    showModal,
    closeModal,
  }
}
