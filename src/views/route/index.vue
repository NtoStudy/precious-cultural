<script setup>
import Pagination from "@/components/Pagination.vue";
import bg1 from '@/assets/bg1.jpg';
import bg2 from '@/assets/bg2.jpg';
import bg3 from '@/assets/bg3.jpg';
const currentImages = [{src: bg1, alt: 'bg1' ,id: 1}, {src: bg2, alt: 'bg2', id: 2}, {src: bg3, alt: 'bg3', id: 3}]
</script>
<template>
  <div class="main-container">
    <div class="header-section">
      <el-image
          src=""
          fit="cover"
          class="header-image"
      />
      <div class="header-content">
        <h1>非遗路线</h1>
        <p>
          这是对非遗路线的描述文字，介绍非遗文化的内容。
        </p>
        <el-button type="primary">MORE</el-button>
      </div>
    </div>

    <div class="case-section">
      <h2>CASE</h2>
      <p>经典路线</p>
      <div class="route-gallery">
        <div class="route-gallery-item" v-for="(image, index) in currentImages" :key="index"
             :class="{'reverse': index % 2 === 1, 'odd': index % 2 === 0, 'even': index % 2 === 1}">
          <img :src="image.src" :alt="image.alt"
               :class="{'odd-img': index % 2 === 0, 'even-img': index % 2 === 1}"/>
          <div class="route-gallery-item-right">
            <p class="route-gallery-item-title">线路标题</p>
            <p class="route-gallery-item-text">线路内容，线路内容，线路内容，线路内容，线路内容，线路内容，线路内容</p>
            <div class="link-container">
              <router-link :to='`/menu/route/detail/${image.id}`'>查看更多 -></router-link>
            </div>
          </div>

        </div>
      </div>
      <Pagination/>
    </div>

  </div>
</template>


<style lang="scss" scoped>
// 定义颜色和尺寸变量
$header-bg-color: #8B0000;
$header-text-color: white;
$header-padding: 20px;
$header-image-height: 200px;
$case-image-height: 150px;

.main-container {
  text-align: center;

  .header-section {
    background-color: $header-bg-color;
    color: $header-text-color;
    padding: $header-padding;

    .header-image {
      width: 100%;
      height: $header-image-height;
    }

    .header-content {
      margin-top: 10px;
    }
  }

  .case-section {
    margin-top: 40px;
    .route-gallery {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      margin: 40px 0;
      padding: 0 40px;
      .route-gallery-item {
        border: 1px solid black;
        border-radius: 50px;
        height: 300px;
        width: 70%;
        display: flex;
        &.reverse {
          flex-direction: row-reverse;
        }
        &.odd {
          img {
            border-top-left-radius: 50px;
            border-bottom-left-radius: 50px;
            border-right: 1px solid black;
          }
          .route-gallery-item-right {
            border-top-right-radius: 50px;
            border-bottom-right-radius: 50px;
          }
        }
        &.even {
          img {
            border-top-right-radius: 50px;
            border-bottom-right-radius: 50px;
            border-left: 1px solid black;
          }
          .route-gallery-item-right {
            border-top-left-radius: 50px;
            border-bottom-left-radius: 50px;
          }
        }
        img {
          width: 70%;
          height: 100%;
        }
        .route-gallery-item-right{
          width: 30%;
          position: relative;
          .route-gallery-item-title{
            font-size: 20px;
            margin-top: 20px;
            text-align: center;
          }
          .route-gallery-item-text{
            margin: 20px;
          }
          .link-container {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
}
</style>
