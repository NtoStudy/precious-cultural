<script setup>


// 写死的数据
import {ref, computed, watch} from 'vue';
import {useRouter} from "vue-router";

const router = useRouter();

const navItems = ['传统技艺', '民俗', '传统戏剧', '传统舞蹈', '曲艺'];
const activeItem = ref(navItems[0]);
import jybg1 from '@/assets/heritage/jiyi/1.png';
import jybg2 from '@/assets/heritage/jiyi/2.jpg';
import jybg3 from '@/assets/heritage/jiyi/3.jpg';
import jybg4 from '@/assets/heritage/jiyi/4.jpg';
import jybg5 from '@/assets/heritage/jiyi/5.jpg';
import jybg6 from '@/assets/heritage/jiyi/6.webp';
import jybg7 from '@/assets/heritage/jiyi/7.webp';
import jybg8 from '@/assets/heritage/jiyi/8.webp';
import jybg9 from '@/assets/heritage/jiyi/9.webp';
import jybg10 from '@/assets/heritage/jiyi/10.webp';
import jybg11 from '@/assets/heritage/jiyi/11.webp';
import jybg12 from '@/assets/heritage/jiyi/12.webp';

import msbg1 from '@/assets/heritage/minsu/1.jpg';
import msbg2 from '@/assets/heritage/minsu/2.webp';
import msbg3 from '@/assets/heritage/minsu/3.webp';
import msbg4 from '@/assets/heritage/minsu/4.webp';
import msbg5 from '@/assets/heritage/minsu/5.webp';
import msbg6 from '@/assets/heritage/minsu/6.webp';
import LastPage from "@/components/lastPage.vue";

// 定义每个分类的图片集合
const imagesByCategory = {
  '传统技艺': [
    {src: jybg1, alt: '手工陶瓷', caption: '手工陶瓷'},
    {src: jybg2, alt: '木雕艺术', caption: '木雕艺术'},
    {src: jybg3, alt: '织锦工艺', caption: '织锦工艺'},
    {src: jybg4, alt: '剪纸艺术', caption: '剪纸艺术'},
    {src: jybg5, alt: '书法艺术', caption: '书法艺术'},
    {src: jybg6, alt: '古琴', caption: '古琴'},
    {src: jybg7, alt: '传统面塑', caption: '传统面塑'},
    {src: jybg8, alt: '漆器工艺', caption: '漆器工艺'},
    {src: jybg9, alt: '竹编艺术', caption: '竹编艺术'},
    {src: jybg10, alt: '传统年画', caption: '传统年画'},
    {src: jybg11, alt: '刺绣工艺', caption: '刺绣工艺'},
    {src: jybg12, alt: '传统铜艺', caption: '传统铜艺'}
  ],
  '民俗': [
    {src: msbg1, alt: '春节', caption: '春节'},
    {src: msbg2, alt: '端午节', caption: '端午节'},
    {src: msbg3, alt: '中秋节', caption: '中秋节'},
    {src: msbg4, alt: '元宵节', caption: '元宵节'},
    {src: msbg5, alt: '七夕节', caption: '七夕节'},
    {src: msbg6, alt: '重阳节', caption: '重阳节'}
  ],
  '传统戏剧': [
    {src: 'path/to/opera1.jpg', alt: '京剧', caption: '京剧'},
    {src: 'path/to/opera2.jpg', alt: '越剧', caption: '越剧'},
    {src: 'path/to/opera3.jpg', alt: '黄梅戏', caption: '黄梅戏'},
    {src: 'path/to/opera4.jpg', alt: '川剧', caption: '川剧'},
    {src: 'path/to/opera5.jpg', alt: '豫剧', caption: '豫剧'},
    {src: 'path/to/opera6.jpg', alt: '评剧', caption: '评剧'}
  ],
  '传统舞蹈': [
    {src: 'path/to/dance1.jpg', alt: '孔雀舞', caption: '孔雀舞'},
    {src: 'path/to/dance2.jpg', alt: '扇子舞', caption: '扇子舞'},
    {src: 'path/to/dance3.jpg', alt: '秧歌舞', caption: '秧歌舞'},
    {src: 'path/to/dance4.jpg', alt: '腰鼓舞', caption: '腰鼓舞'},
    {src: 'path/to/dance5.jpg', alt: '龙舞', caption: '龙舞'},
    {src: 'path/to/dance6.jpg', alt: '狮子舞', caption: '狮子舞'}
  ],
  '曲艺': [
    {src: 'path/to/crosstalk.jpg', alt: '相声', caption: '相声'},
    {src: 'path/to/storytelling.jpg', alt: '评书', caption: '评书'},
    {src: 'path/to/clapperTalk.jpg', alt: '快板', caption: '快板'},
    {src: 'path/to/balladSinging.jpg', alt: '大鼓', caption: '大鼓'},
    {src: 'path/to/comicDialogue.jpg', alt: '双簧', caption: '双簧'},
    {src: 'path/to/improvisationalTalk.jpg', alt: '即兴说唱', caption: '即兴说唱'}
  ]
};
// 获取当前激活分类的图片
// const currentImages = computed(() => imagesByCategory[activeItem.value] || []);

// 点击图片跳转到详情页
const goToDetail = (caption) => {
  router.push({
    name: 'heritageDetail',
    params: {
      heritageId: caption
    }
  })
};

// 分页相关
// 当前页码
const currentPage = ref(1);
// 每页显示的条目数
const pageSize = ref(6);
// 获取当前激活分类的图片
const currentImages = computed(() => {
  const images = imagesByCategory[activeItem.value] || [];
  // console.log(images);
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return images.slice(start, end);
});
// console.log(currentImages);
// 监听路由变化和激活分类变化，更新当前页码
watch(activeItem, () => {
  currentPage.value = 1;
});

// 处理分页器的更改事件
function handlePageChange(newPage) {
  currentPage.value = newPage;
}
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
      <div class="pagination-container">
        <el-pagination
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handlePageChange"
            background
            layout="prev, pager, next"
            :total="66"
        />
      </div>
    </main>
  </div>
</template>


<style lang="scss" scoped>
.heritage-page {
  background-image: url("@/assets/img_1.png"); /* 设置背景图片 */
  background-size: cover; /* 背景图片覆盖整个元素 */
  background-repeat: no-repeat; /* 背景图片不重复 */
  background-position: center center; /* 背景图片居中显示 */
  text-align: center;
  padding: 0 80px;
  overflow: hidden; // 确保伪元素不会超出主元素的范围
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
      height: 100%;
      border-radius: 50px;

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

.pagination-container {
  display: flex;
  justify-content: center;
  margin: 40px auto;
  width: 100%;
}
</style>
