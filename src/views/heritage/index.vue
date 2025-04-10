<script setup>
// 导入Vue相关的功能
import {ref, computed, onMounted, watch} from 'vue';
import {useRouter} from "vue-router";
import {hallNonHeritagePageGetApi} from "@/api/heritage/nonHertage.js";
import {forumLabelGetApi} from "@/api/forum/label.js";
import { ElMessage } from 'element-plus';

const router = useRouter();

// 定义导航项
const navItems = ref([]); // 导航项数组
const activeItem = ref(null); // 当前激活的导航项
const showAll = ref(false); // 是否显示所有导航项
const visibleItems = computed(() => showAll.value ? navItems.value : navItems.value.slice(0, 5)); // 计算可见的导航项
const activeItemIndex = computed(() => navItems.value.indexOf(activeItem.value));
const pageSize = ref(6); // 每页显示的数量
const currentPage = ref(1); // 当前页码
const total = ref(10); // 总记录数
const NonHeritagePageData = ref([]); // 非遗页面数据
const hoveredIndex = ref(null); // 鼠标悬停项的索引
const loading = ref(false); // 加载状态
const remainingItems = computed(() => navItems.value.slice(5)); // 计算剩余的导航项

// 处理当前页码变化
const handleCurrentChange = () => {
  userNonHeritagePage();
};

// 获取用户非遗页面数据的异步函数
const userNonHeritagePage = async () => {
  try {
    loading.value = true;
    const res = await hallNonHeritagePageGetApi(currentPage.value, pageSize.value, activeItemIndex.value + 1);
    const data = res.data.data;
    total.value = data.total;
    NonHeritagePageData.value = data.records;
  } catch (error) {
    console.error('获取非遗数据失败:', error);
    ElMessage.error('获取数据失败，请稍后重试');
    NonHeritagePageData.value = [];
  } finally {
    loading.value = false;
  }
};

/**
 * 获取论坛标签
 * @returns {Promise<void>}
 */
const forumLabel = async () => {
  try {
    loading.value = true;
    const res = await forumLabelGetApi();
    const data = res.data.data;
    navItems.value = data.map(item => item.labelName);
    // 确保 navItems 不为空后设置 activeItem
    if (navItems.value.length > 0) {
      activeItem.value = navItems.value[0];
    }
  } catch (error) {
    console.error('获取标签失败:', error);
    ElMessage.error('获取分类失败，请稍后重试');
    navItems.value = ['默认分类'];
    activeItem.value = '默认分类';
  } finally {
    loading.value = false;
  }
}

// 跳转到详情页面
const goToDetail = (item) => {
  router.push(`/menu/heritage/heritageDetail/${item.id}`);
};

// 处理鼠标进入事件
const handleMouseEnter = (index) => {
  hoveredIndex.value = index;
}

// 处理鼠标离开事件
const handleMouseLeave = () => {
  hoveredIndex.value = null;
};

// 处理下拉菜单点击事件
const changeItemActive = (index) => {
  activeItem.value = navItems.value[index];
  currentPage.value = 1;
  userNonHeritagePage();
}

const changeVisibleItem = (item) => {
  activeItem.value = item;
  currentPage.value = 1;
  userNonHeritagePage();
}

// 组件挂载时获取数据
onMounted(() => {
  forumLabel();
})

// 监听激活项索引变化
watch(activeItemIndex, () => {
  userNonHeritagePage();
})
</script>

<template>
  <div class="heritage-page">
    <header class="header">
      <div class="logo">文化遗产</div>
      <div class="search-box">
        <el-input placeholder="搜索文化遗产..." prefix-icon="Search" clearable></el-input>
      </div>
    </header>
    
    <nav class="nav">
      <ul>
        <li v-for="(item, index) in visibleItems"
            :key="index"
            :class="{ active: activeItem === item }"
            @click="changeVisibleItem(item)">
          {{ item }}
        </li>
        <el-dropdown trigger="click" style="cursor: pointer" v-if="navItems.length > 5">
          <span class="el-dropdown-link">
            更多
            <el-icon class="el-icon--right">
              <arrow-down/>
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item 
                v-for="(item, index) in remainingItems" 
                :key="index + 5"
                @click="changeItemActive(index + 5)">
                {{ item }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </ul>
    </nav>
    
    <main>
      <h1 class="title">HERITAGE.</h1>
      <p class="subtitle">名录代表 -- {{ activeItem }}</p>
      
      <el-skeleton :rows="3" animated :loading="loading" v-if="loading">
        <template #template>
          <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
            <el-skeleton-item v-for="i in 6" :key="i" variant="image" style="width: 30%; height: 200px; margin: 10px;"></el-skeleton-item>
          </div>
        </template>
      </el-skeleton>
      
      <div v-else-if="NonHeritagePageData.length === 0" class="empty-data">
        <el-empty description="暂无数据" />
      </div>
      
      <div v-else class="gallery">
        <div class="gallery-item" v-for="(item, index) in NonHeritagePageData" :key="index"
             @mouseenter="handleMouseEnter(index)"
             @mouseleave="handleMouseLeave"
             @click="() => goToDetail(item)">
          <el-image 
            :src="item.imgUrl" 
            :alt="item.name"
            fit="cover"
            lazy
            :preview-src-list="[item.imgUrl]">
            <template #error>
              <div class="image-error">
                <el-icon><Picture /></el-icon>
                <span>加载失败</span>
              </div>
            </template>
          </el-image>
          <div class="caption" v-if="hoveredIndex !== index">
            {{ item.name }}
          </div>
          <div class="hovered" v-else>
            {{ item.introductionEasy }}
          </div>
        </div>
      </div>
      
      <div class="pagination-container" v-if="total > pageSize">
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
    
    <footer class="footer">
      <p>© 2024 遗珍非往 - 文化遗产保护与传承</p>
    </footer>
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  
  .logo {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    font-family: 'STXingkai', serif;
  }
  
  .search-box {
    width: 300px;
  }
}

.nav {
  position: relative;
  margin: 20px 0;
  
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 30px;
    padding: 0;
  }

  li {
    cursor: pointer;
    padding: 8px 16px;
    font-size: 16px;
    position: relative;
    transition: all 0.3s ease;
    
    &:hover {
      color: #c9b09a;
    }

    &.active {
      color: #c9b09a;
      font-weight: bold;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #c9b09a;
        transition: all 0.3s ease;
      }
    }
  }
  
  .el-dropdown-link {
    color: #333;
    font-size: 16px;
    display: flex;
    align-items: center;
    
    &:hover {
      color: #c9b09a;
    }
  }
}

.title {
  font-size: 48px;
  margin-top: 20px;
  font-weight: bold;
  color: #333;
  letter-spacing: 2px;
}

.subtitle {
  font-size: 20px;
  color: #666;
  margin-bottom: 40px;
  font-family: 'STKaiti', serif;
}

.gallery {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 40px 0;
  padding: 0 40px;

  .gallery-item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    height: 240px;
    width: 30%;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    .el-image {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      transition: transform 0.5s ease;
    }

    &:hover .el-image {
      transform: scale(1.1);
    }

    .caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      padding: 15px;
      font-size: 18px;
      font-weight: bold;
      transition: all 0.3s ease;
    }

    .hovered {
      opacity: 0;
      background: rgba(0, 0, 0, 0.7);
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      text-align: center;
      color: white;
      font-size: 16px;
      line-height: 1.6;
      transition: opacity 0.3s ease;
    }

    &:hover .hovered {
      opacity: 1;
    }
    
    .image-error {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #909399;
      
      .el-icon {
        font-size: 32px;
        margin-bottom: 10px;
      }
    }
  }
}

.empty-data {
  margin: 60px 0;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin: 40px auto;
  width: 100%;
}

.footer {
  margin-top: auto;
  padding: 20px 0;
  color: #666;
  font-size: 14px;
}
</style>