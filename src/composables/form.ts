import type { Ref, UnwrapNestedRefs } from 'vue'

type K = 'add' | 'edit'

/**
 * @param baseFormData T 为 form 类型，S 为原对象类型
 * @param submit 向父级提交保存数据
 */
export function useFormModal<T extends object, S extends object>(
  baseFormData: T,
  submit: () => void,
): {
    refForm: Ref<any>
    handleOk: () => void
    handleCancel: () => void
    formEl: {
      formData: UnwrapNestedRefs<T>
      loading: Ref<boolean>
      endLoading: () => void
      openModal: (type: K, data?: S) => void
      closeModal: () => void
    }
  } {
  const refForm = ref()
  const formData = reactive<T>({ ...baseFormData })
  const type = ref<K>('add')
  const visible = ref(false)
  const selectedItem = ref<S>()

  const { loading, startLoading, endLoading } = useLoading()

  const setType = (value: K) => type.value = value
  const setVisible = (value: boolean) => visible.value = value
  const setSelectedItem = (data?: S) => selectedItem.value = data

  const assign = () => { // 赋值
    const source = [baseFormData, selectedItem][Number(type.value === 'edit')]
    G.assignObj(source, formData)
  }

  watch(visible, (val) => {
    if (val) assign()
    endLoading()
    refForm.value?.clearValidate()
  })

  const handleOk = () => {
    refForm.value.validate((errors: any) => {
      if (errors) return
      startLoading()
      submit?.()
    })
  }

  const handleCancel = () => setVisible(false)

  return {
    refForm,
    handleOk,
    handleCancel,
    formEl: {
      formData,
      loading,
      endLoading,
      openModal(type: K, data?: S) {
        setType(type)
        setVisible(true)
        setSelectedItem(data)
      },
      closeModal() {
        setVisible(false)
      },
    },
  }
}
