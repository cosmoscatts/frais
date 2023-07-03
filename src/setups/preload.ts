import PreloadAnimationPage from '~/components/PreloadAnimationPage.vue'

export default function preload() {
  const preload = createApp(PreloadAnimationPage)
  preload.mount('#preload')
}
