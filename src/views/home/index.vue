<script setup>
import {ref, onMounted} from 'vue';
// 导入图片资源 作为轮播图
import bg1 from '@/assets/bg1.jpg';
import bg2 from '@/assets/bg2.jpg';
import bg3 from '@/assets/bg3.jpg';

const images = [bg1, bg2, bg3];
// 设置轮播间隔时间
const interval = ref(3000);
// 控制背景图为视口高度减去60px
const carouselHeight = ref('100vh');

onMounted(() => {
  // 使用window.innerHeight获取视口高度
  const viewportHeight = window.innerHeight;
  carouselHeight.value = `calc(${viewportHeight}px - 60px)`;
})
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
