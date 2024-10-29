<script setup>
// 导入Vue相关的功能
import {ref, computed, onMounted, watch} from 'vue';
import {useRouter} from "vue-router";
import {hallNonHeritagePageGetApi} from "@/api/heritage/nonHertage.js";
import {forumLabelGetApi} from "@/api/forum/label.js";

const router = useRouter();

// 定义导航项
const navItems = ref([]); // 导航项数组
const activeItem = ref(navItems[0]); // 当前激活的导航项
const showAll = ref(false); // 是否显示所有导航项
const visibleItems = computed(() => showAll.value ? navItems.value : navItems.value.slice(0, 5)); // 计算可见的导航项
const activeItemIndex = computed(() => navItems.value.indexOf(activeItem.value));
const pageSize = ref(6); // 每页显示的数量
const currentPage = ref(1); // 当前页码
const total = ref(10); // 总记录数
const NonHeritagePageData = ref(null); // 非遗页面数据
const hoveredIndex = ref(null); // 鼠标悬停项的索引

// 处理当前页码变化
const handleCurrentChange = () => {
  userNonHeritagePage();
};

// 获取用户非遗页面数据的异步函数
const userNonHeritagePage = async () => {
  const res = await hallNonHeritagePageGetApi(currentPage.value, pageSize.value, activeItemIndex.value + 1);
  const data = res.data.data;
  total.value = data.total;
  NonHeritagePageData.value = data.records;
};

const forumLabel = async () => {
  const res = await forumLabelGetApi();
  const data = res.data.data;
  navItems.value = data.map(item => item.labelName);
}

// 跳转到详情页面
const goToDetail = (item) => {
  router.push(`/menu/heritage/heritageDetail/${item.id}`);
};

// 组件挂载时获取数据
onMounted(() => {
  userNonHeritagePage()
  forumLabel()
})

// 监听激活项索引变化
watch(activeItemIndex, () => {
  userNonHeritagePage()
})

// 处理鼠标进入事件
const handleMouseEnter = (index) => {
  hoveredIndex.value = index
}

// 处理鼠标离开事件
const handleMouseLeave = () => {
  hoveredIndex.value = null;
};

// 处理下拉菜单点击事件
const changeItemActive = (index) => {
  activeItem.value = navItems.value[index];
}
</script>

<template>
  <div class="heritage-page">
    <header class="header">
      <div class="logo">文化遗产</div>
    </header>
    <nav class="nav">
      <ul>
        <li v-for="(item, index) in visibleItems"
            :key="index"
            :class="{ active: activeItem === item }"
            @click="activeItem = item">
          {{ item }}
        </li>
        <el-dropdown trigger="click" style="cursor: pointer">
      <span class="el-dropdown-link">
        更多
        <el-icon class="el-icon--right">
          <arrow-down/>
        </el-icon>
      </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="changeItemActive(5)">{{ navItems[5] }}</el-dropdown-item>
              <el-dropdown-item @click="changeItemActive(6)">{{ navItems[6] }}</el-dropdown-item>
              <el-dropdown-item @click="changeItemActive(7)">{{ navItems[7] }}</el-dropdown-item>
              <el-dropdown-item @click="changeItemActive(8)">{{ navItems[8] }}</el-dropdown-item>
              <el-dropdown-item @click="changeItemActive(9)">{{ navItems[9] }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </ul>

    </nav>
    <main>
      <h1 class="title">HERITAGE.</h1>
      <p class="subtitle">名录代表 -- {{ activeItem }}</p>
      <div class="gallery">
        <div class="gallery-item" v-for="(item, index) in NonHeritagePageData" :key="index"
             @mouseenter="handleMouseEnter(index)"
             @mouseleave="handleMouseLeave"
             @click="() => goToDetail(item.id)">
          <img :src="item.imgUrl" :alt="item.name"/>
          <div class="caption" v-if="!hoveredIndex === index">
            {{ item.name }}
          </div>
          <div class="hovered" v-else>
            {{ item.introductionEasy }}
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
  background-image: url("@/assets/img_1.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  text-align: center;
  padding: 0 80px;
  overflow: hidden;
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
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50px;
      transition: transform 0.5s ease;
    }

    &:hover {
      img {
        transform: scale(1.5);
      }


      .hovered {
        opacity: 1;
        background: rgba(159, 156, 156, 0.8);
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        border-radius: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        text-align: center;
      }
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
