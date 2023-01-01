<script setup lang="ts">
import LoginWrapper from './components/LoginWrapper.vue'

const bgList = ref([
  'bar_y',
  'bar_x',
  'line_gradient',
  'line',
  'funnel',
  'heatmap',
  'map',
  'pie',
  'radar',
])
const getImageUrl = (name: string) => new URL(`../../assets/login/${name}.png`, import.meta.url).href
const shuffle = () => bgList.value = lodash.shuffle(bgList.value)
const carouselImgList = ['one', 'two', 'three']
const formBgColor = computed(() => ['rgba(240, 240, 240, 0.7)', 'rgba(35,35,36, 0.7)'][Number(isDark.value)])
const carouselDotsBgColor = computed(() => ['rgba(0, 0, 0, 0.4)', 'rgba(255, 255, 255, 0.4)'][Number(isDark.value)])
const carouselDotsActiveBgColor = computed(() => ['#30353D', 'white'][Number(isDark.value)])

onMounted(() => useIntervalFn(shuffle, 4000))
</script>

<template>
  <div hscreen wscreen p0 m0>
    <div class="login-container">
      <n-carousel
        autoplay flex-c class="carousel-box" :style="{
          width: '25%',
          minWidth: '400px',
          height: '50vh',
          marginTop: '10vh',
        }"
      >
        <img v-for="image in carouselImgList" :key="image" class="carousel-img" :src="getImageUrl(image)">

        <template #dots="{ total, currentIndex, to }">
          <ul class="carousel-dots">
            <li
              v-for="index of total" :key="index" :class="{ ['is-active']: currentIndex === index - 1 }"
              @click="to(index - 1)"
            />
          </ul>
        </template>
      </n-carousel>
      <div hfull flex-y-c relative>
        <div z-1 class="bg-img-box">
          <TransitionGroup name="list-complete">
            <template v-for="item in bgList" :key="item">
              <div class="bg-img-box-li list-complete-item">
                <img :src="getImageUrl(item)" alt="chart">
              </div>
            </template>
          </TransitionGroup>
        </div>
        <LoginWrapper class="form" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  background: url('~/assets/login/bg.png') no-repeat 0 -120px;
  overflow: hidden;
}

.form {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 480px;
  height: 630px;
  margin-top: 20px;
  background-color: v-bind(formBgColor);
  backdrop-filter: blur(20px);
  padding: 20px;
  box-shadow: 0 0 20px 5px rgba(40, 40, 40, 0.3);
  border-radius: 8px;
  z-index: 2;
}

.bg-img-box {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 770px;
  margin-right: -20px;

  &-li {
    img {
      margin-right: 20px;
      margin-top: 20px;
      width: 230px;
      border-radius: 2 * 8px;
      opacity: 0.9;
    }
  }
}

@media only screen and (max-width: 1200px) {

  .bg-img-box,
  .carousel-box {
    display: none !important;
  }
}

.list-complete-item {
  transition: all 1s;
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}

.carousel-img {
  width: 100%;
  object-fit: cover;
}

.carousel-dots {
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.carousel-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: v-bind(carouselDotsBgColor);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.carousel-dots li.is-active {
  width: 40px;
  background-color: v-bind(carouselDotsActiveBgColor);
}
</style>
