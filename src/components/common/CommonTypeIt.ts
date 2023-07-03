import TypeItPlugin from 'typeit'

export const CommonTypeIt = defineComponent({
  name: 'TypeIt',
  props: {
    speed: {
      type: Number,
      default: 200,
    },
    values: {
      type: Array,
      default() {
        return []
      },
    },
    className: {
      type: String,
      default: 'type-it',
    },
    cursor: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    new (TypeItPlugin as any)(`.${this.className}`, {
      strings: this.values as string[],
      speed: this.speed,
      cursor: this.cursor,
    }).go()
  },
  render() {
    return h(
      'span',
      {
        class: this.className,
      },
      {
        default: () => [],
      },
    )
  },
})
