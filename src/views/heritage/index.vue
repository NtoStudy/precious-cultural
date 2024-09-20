<script setup>
import {ref, computed } from 'vue';
import {useRouter} from "vue-router";
import Pagination from "@/components/Pagination.vue";
const router = useRouter();

const navItems = ['传统技艺', '民俗', '传统戏剧', '传统舞蹈', '曲艺'];
const activeItem = ref(navItems[0]);

// 定义每个分类的图片集合
const imagesByCategory = {
  '传统技艺': [
    {src: 'path/to/image1.jpg', alt: 'Image 1', caption: '手工陶瓷'},
    {src: 'path/to/image2.jpg', alt: 'Image 2', caption: '木雕艺术'},
    {src: 'path/to/image3.jpg', alt: 'Image 3', caption: '织锦工艺'},
    {src: 'path/to/image1.jpg', alt: 'Image 1', caption: '手工陶瓷'},
    {src: 'path/to/image2.jpg', alt: 'Image 2', caption: '木雕艺术'},
    {src: 'path/to/image3.jpg', alt: 'Image 3', caption: '织锦工艺'},
  ],
  '民俗': [
    {src: 'path/to/image4.jpg', alt: 'Image 4', caption: '春节'},
    {src: 'path/to/image5.jpg', alt: 'Image 5', caption: '端午节'},
    {src: 'path/to/image6.jpg', alt: 'Image 6', caption: '中秋节'}
  ],
  '传统戏剧': [
    {src: 'path/to/image7.jpg', alt: 'Image 7', caption: '京剧'},
    {src: 'path/to/image8.jpg', alt: 'Image 8', caption: '川剧变脸'},
    {src: 'path/to/image9.jpg', alt: 'Image 9', caption: '黄梅戏'}
  ],
  '传统舞蹈': [
    {src: 'path/to/image10.jpg', alt: 'Image 10', caption: '龙舞'},
    {src: 'path/to/image11.jpg', alt: 'Image 11', caption: '狮舞'},
    {src: 'path/to/image12.jpg', alt: 'Image 12', caption: '秧歌'}
  ],
  '曲艺': [
    {src: 'path/to/image13.jpg', alt: 'Image 13', caption: '相声'},
    {src: 'path/to/image14.jpg', alt: 'Image 14', caption: '评书'},
    {src: 'path/to/image15.jpg', alt: 'Image 15', caption: '快板'}
  ]
};
// 获取当前激活分类的图片
const currentImages = computed(() => imagesByCategory[activeItem.value] || []);

// 点击图片跳转到详情页
const goToDetail = (caption) => {
  const path = `/menu/detail/${encodeURIComponent(caption)}`;
  router.push(path);
};

</script>

<template>
  <div class="heritage-page">
    <header class="header">
      <div class="logo">文化遗产</div>
    </header>
    <nav class="nav">
      <ul>
        <li v-for="(item, index) in navItems"
            :key="index"
            :class="{ active: activeItem === item }"
            @click="activeItem = item">
          {{ item }}
        </li>
      </ul>
    </nav>
    <main>
      <h1 class="title">HERITAGE.</h1>
      <p class="subtitle">名录代表 -- {{ activeItem }}</p>
      <div class="gallery">
        <div class="gallery-item" v-for="(image, index) in currentImages" :key="index"
             @click="() => goToDetail(image.caption)">
          <img :src="image.src" :alt="image.alt"/>
          <div class="caption">
           {{ image.caption }}
          </div>
        </div>
      </div>
      <Pagination/>
    </main>
  </div>
</template>


<style lang="scss" scoped>
.heritage-page {
  text-align: center;
  padding: 0 80px;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
.logo {
  font-size: 24px;
}
.nav {
  position: absolute;
  right: 40px;

  ul {
    list-style: none;
    display: flex;
    gap: 20px;
  }

  li {
    cursor: pointer;

    &.active {
      border-bottom: 2px solid red;
    }
  }
}
.title {
  font-size: 36px;
  margin-top: 20px;
}
.subtitle {
  font-size: 18px;
  color: gray;
}
.gallery {
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

</style>
