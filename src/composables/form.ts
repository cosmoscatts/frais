import type { Ref, UnwrapNestedRefs } from 'vue'

type K = 'add' | 'edit'

/**
 * @param baseFormData T 为 form 类型，S 为原对象类型
 * @param submit 向父级提交保存数据
 */
export function useFormModal<T extends object, S extends object>(
  baseFormData: T,
  refForm: Ref<any>,
  emits: any,
  emitName = 'saveData',
  preSubmit?: () => void,
): {
    formData: UnwrapNestedRefs<T>
    type: Ref<K>
    visible: Ref<boolean | undefined>
    selectedItem: Ref<S | undefined>
    loading: Ref<boolean>
    props: UnwrapNestedRefs<{
      type: Ref<K> | K
      visible: Ref<boolean | undefined> | boolean | undefined
      selectedItem: Ref<S | undefined> | S | undefined
      loading: Ref<boolean> | boolean
    }>
    endLoading: () => void
    handleOk: (e: MouseEvent) => void
    openModal: (type: K, data?: S) => void
    openModalCb: (val?: boolean) => void
    closeModal: () => void
  } {
  const formData = reactive<T>({ ...baseFormData })
  const type = ref<K>('add')
  const visible = ref(false)
  const selectedItem = ref<S>()

  const { loading, startLoading, endLoading } = useLoading()

  const setType = (value: K) => type.value = value
  const setVisible = (value: boolean) => visible.value = value
  const setSelectedItem = (data?: S) => selectedItem.value = data

  const assign = () => { // 赋值
    const source = [baseFormData, selectedItem.value ?? {}][Number(type.value === 'edit')]
    G.assignObj(source, formData)
  }

  const handleOk = (e: MouseEvent) => {
    e.preventDefault()
    refForm.value.validate((errors: any) => {
      if (errors) return
      startLoading()
      preSubmit?.()
      emits?.(emitName, G.clone(formData))
    })
  }

  return {
    formData,
    type,
    visible,
    selectedItem,
    loading,
    props: reactive({
      type,
      visible,
      selectedItem,
      loading,
    }),
    endLoading,
    handleOk,
    openModal(type: K, data?: S) {
      setType(type)
      setVisible(true)
      setSelectedItem(data)
    },
    openModalCb(val?: boolean) {
      if (val) assign()
      endLoading()
      refForm.value?.restoreValidation()
    },
    closeModal() {
      setVisible(false)
    },
  }
}
