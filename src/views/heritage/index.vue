<script setup>
import {ref, computed, onMounted,watch} from 'vue';
import {useRouter} from "vue-router";
import {userNonHeritagePageApi} from "@/api/index.js";
const router = useRouter();

const navItems = ['民间文学', '传统戏剧', '传统美术', '传统医药', '传统音乐'];
const activeItem = ref(navItems[0]);
// 计算属性来获取 activeItem 的索引
const activeItemIndex = computed(() => navItems.indexOf(activeItem.value));
// 定义每个分类的图片集合
const imagesByCategory = ref([]);

// 分页器相关内容
const pageSize = ref(6)
const currentPage = ref(1)
const total = ref(10)
const handleCurrentChange = () => {
  getUserNonHeritagePageApi()
}
// 点击图片跳转到详情页
const goToDetail = (caption) => {
  const path = `/menu/heritage/heritageDetail/${encodeURIComponent(caption)}`;
  router.push(path);
};

// 调取接口，获取分页数据
const userNonHeritagePageData = ref(null)
const getUserNonHeritagePageApi = async () => {
  userNonHeritagePageData.value = await userNonHeritagePageApi(currentPage.value, pageSize.value, activeItemIndex.value + 1);
  total.value = userNonHeritagePageData.value.data.data.total
  imagesByCategory.value = userNonHeritagePageData.value.data.data.records

}
onMounted(() => {
  getUserNonHeritagePageApi()
})
watch(activeItemIndex, () => {
  getUserNonHeritagePageApi()
  console.log(activeItemIndex.value + 1)
  console.log(userNonHeritagePageData.value.data.data)
  console.log(imagesByCategory.value)
})
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
        <div class="gallery-item" v-for="(image, index) in imagesByCategory" :key="index"
             @click="() => goToDetail(image.id)">
          <img :src="image.imgUrl" :alt="image.alt"/>
          <div class="caption">
           {{ image.name }}
          </div>
        </div>
      </div>
      <div class="pagination-container">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :total="total"
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
        />
      </div>
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
.pagination-container {
  display: flex;
  justify-content: center;
  margin: 40px auto;
  width: 100%;
}
</style>
