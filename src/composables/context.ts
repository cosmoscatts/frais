import type { InjectionKey } from 'vue'

export function useContext<T>(name = 'context') {
  const injectKey: InjectionKey<T> = Symbol(name)

  return {
    useProvide(context: T) {
      provide(injectKey, context)
      return context
    },
    useInject() {
      return inject(injectKey) as T
    },
  }
}
