<script setup>
import {ref, onMounted, watchEffect} from 'vue';
// 导入图片资源 作为轮播图
import bg1 from '@/assets/bg1.jpg';
import bg2 from '@/assets/bg2.jpg';
import bg3 from '@/assets/bg3.jpg';

const images = [bg1, bg2, bg3];
// 设置轮播间隔时间
const interval = ref(3000);
// 控制背景图为视口高度减去60px
const carouselHeight = ref('100vh');
const viewportHeight = ref(window.innerHeight);
// 监听视口高度变化，动态设置轮播图高度
onMounted(() => {
  // 使用window.innerHeight获取视口高度
  carouselHeight.value = `calc(${viewportHeight}px - 60px)`;
})

// 页面发生变化的时候 动态设置高度
// 监听viewportHeight变化并根据窗口高度调整carousel高度
watchEffect(() => {
  // 监听viewportHeight变化
  viewportHeight.value = window.innerHeight;
  carouselHeight.value = `calc(${viewportHeight.value}px - 60px)`;
});
// 监听窗口大小变化事件
window.addEventListener('resize', () => {
  viewportHeight.value = window.innerHeight;
  carouselHeight.value = `calc(${viewportHeight.value}px - 60px)`;

});
// 监听方向变化事件
window.addEventListener('orientationchange', () => {
  viewportHeight.value = window.innerHeight;
  carouselHeight.value = `calc(${viewportHeight.value}px - 60px)`;

});


</script>

<template>
  <el-carousel
      :interval="interval"
      :height="carouselHeight"
      arrow="always"
  >
    <el-carousel-item
        v-for="(img, index) in images"
        :key="index"
        :style="{ backgroundImage: `url(${img})`}"
        style="background-size: cover; background-position: center;">
    </el-carousel-item>
  </el-carousel>
</template>

<style lang="scss" scoped>


</style>
