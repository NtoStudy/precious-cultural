<script setup>
import Pagination from "@/components/Pagination.vue";
const currentImages = [ {src: 'path/to/image1.jpg', alt: 'Image 1', caption: '手工陶瓷'},
  {src: 'path/to/image2.jpg', alt: 'Image 2', caption: '木雕艺术'},
  {src: 'path/to/image3.jpg', alt: 'Image 3', caption: '织锦工艺'},
  {src: 'path/to/image1.jpg', alt: 'Image 1', caption: '手工陶瓷'},
  {src: 'path/to/image2.jpg', alt: 'Image 2', caption: '木雕艺术'},
  {src: 'path/to/image3.jpg', alt: 'Image 3', caption: '织锦工艺'}]
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
      <div class="gallery">
        <div class="gallery-item" v-for="(image, index) in currentImages" :key="index">
          <img :src="image.src" :alt="image.alt"/>
          <div class="caption">
            {{ image.caption }}
          </div>
        </div>
      </div>
      <Pagination/>
    </div>

  </div>
</template>



<style lang="scss" scoped >
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
    .gallery{
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      margin: 40px 0;
      padding: 0 40px;
      .gallery-item {
        border: 1px solid black;
        border-radius: 50px;
        height: 200px;
        width: 30%;
        position: relative;
        img {
          width: 100%;
          height: auto;
        }
        .caption {
          position: absolute;
          border-radius: 20px;
          bottom: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.4);
          color: white;
          padding: 5px;
        }
      }
    }
  }
}
</style>
