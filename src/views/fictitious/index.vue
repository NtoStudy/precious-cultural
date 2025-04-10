<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { hallPanoramaPageGetApi } from "@/api/heritage/panorama.js";
import { ElMessage, ElSkeleton } from 'element-plus';
import { View, Location, Calendar, Picture } from '@element-plus/icons-vue';
import {fictitiousData} from './fictitious.js'
const router = useRouter();
const currentPage = ref(1);
const pageSize = ref(6);
const total = ref(0);
const loading = ref(false);
const error = ref(false);
const searchKeyword = ref('');
const fictitiousList = ref([]);
const hoveredIndex = ref(null);

// 计算属性：过滤后的列表
const filteredList = computed(() => {
  if (!searchKeyword.value) return fictitiousList.value;
  return fictitiousList.value.filter(item =>
    item.name?.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchKeyword.value.toLowerCase())
  );
});

// 处理页码变化
function handlePageChange() {
  // userPanoramaPage();
  console.log(12)
}

// 点击跳转到景点详情页
function goToDetail(item) {
  router.push(`/menu/fictitious/fictitiousDetail/${item.id}`);
}

// 获取用户的景点列表
const userPanoramaPage = async () => {
  try {
    loading.value = true;
    error.value = false;
    const res = await hallPanoramaPageGetApi(currentPage.value, pageSize.value);
    console.log(res.data.data)
    const data = res.data.data;
    total.value = data.total;

    console.log(data.records)
    // 处理图片URL，添加代理
    fictitiousList.value = data.records.map(item => ({
      ...item,
      url: item.url
    }));
  } catch (err) {
    console.error('获取全景数据失败:', err);
    error.value = true;
    ElMessage.error('获取数据失败，请稍后重试');
    fictitiousList.value = [];
  } finally {
    loading.value = false;
  }
};

const loadLocalData = () => {
  try {
    loading.value = true;
    error.value = false;

    // 计算分页数据
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;

    // 使用本地数据
    fictitiousList.value = fictitiousData.slice(start, end).map(item => ({
      ...item,
      name: item.description?.replace('全景图', '') || '未命名展览', // 从描述中提取名称
      location: '中国传统文化展馆',  // 添加默认位置
    }));

  } catch (err) {
    console.error('加载数据失败:', err);
    error.value = true;
    ElMessage.error('加载数据失败，请稍后重试');
    fictitiousList.value = [];
  } finally {
    loading.value = false;
  }
  console.log(fictitiousList.value)
};
// 搜索功能
const handleSearch = () => {
  if (filteredList.value.length === 0) {
    ElMessage.warning('未找到匹配的展览');
  }
};

// 处理鼠标进入事件
const handleMouseEnter = (index) => {
  hoveredIndex.value = index;
};

// 处理鼠标离开事件
const handleMouseLeave = () => {
  hoveredIndex.value = null;
};



onMounted(() => {
  // userPanoramaPage();
  loadLocalData()
});
</script>

<template>
  <div class="fictitious-container">
    <div class="header-section">
      <h1 class="main-title">VR 文化遗产展厅</h1>
      <p class="subtitle">沉浸式体验中国非物质文化遗产的魅力</p>

      <div class="search-box">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索展览..."
          prefix-icon="Search"
          clearable
          @input="handleSearch"
          @keyup.enter="handleSearch">
        </el-input>
      </div>
    </div>

    <!-- 加载状态 -->
    <el-skeleton :loading="loading" animated :rows="2" v-if="loading">
      <template #template>
        <div class="skeleton-container">
          <div class="skeleton-row">
            <el-skeleton-item variant="image" style="width: 30%; height: 200px; margin: 10px;" v-for="i in 3" :key="i" />
          </div>
          <div class="skeleton-row">
            <el-skeleton-item variant="image" style="width: 30%; height: 200px; margin: 10px;" v-for="i in 3" :key="i+3" />
          </div>
        </div>
      </template>
    </el-skeleton>

    <!-- 空数据状态 -->
    <div v-else-if="filteredList.length === 0" class="empty-container">
      <el-empty description="暂无展览数据" />
    </div>

    <!-- 内容展示 -->
    <div v-else class="fictitious-container-list">
      <div class="elCard">
        <div
          class="vr-card"
          v-for="(item, index) in filteredList"
          :key="item.id"
          @mouseenter="handleMouseEnter(index)"
          @mouseleave="handleMouseLeave"
          @click="goToDetail(item)"
        >
          <div class="card-image">
            <el-image
              :src="item.url"
              fit="cover"
              :preview-src-list="[item.url]">
              <template #error>
                <div class="image-error">
                  <el-icon><Picture /></el-icon>
                  <span>图片加载失败</span>
                </div>
              </template>
            </el-image>
            <div class="vr-badge">
              <el-icon><View /></el-icon>
              VR全景
            </div>
          </div>

          <div class="card-content">
            <h3 class="card-title">{{ item.name || '未命名展览' }}</h3>
            <div class="card-meta">
              <span class="meta-item">
                <el-icon><Location /></el-icon>
                {{ item.location || '未知位置' }}
              </span>
              <span class="meta-item">
                <el-icon><Calendar /></el-icon>
                {{ item.createTime || '未知时间' }}
              </span>
            </div>
            <p class="card-description">{{ item.description || '暂无描述' }}</p>

            <div class="card-action" :class="{ active: hoveredIndex === index }">
              <span>进入VR展厅</span>
              <el-icon><View /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination-container" v-if="total > pageSize">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        @current-change="handlePageChange"
        background
        layout="prev, pager, next"
        :total="total"
      />
    </div>

  </div>
</template>

<style lang="scss" scoped>
.fictitious-container {
  background-image: url('@/assets/img_1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 40px 0;
  display: flex;
  flex-direction: column;

  .header-section {
    text-align: center;
    padding: 20px 40px 40px;
    background-color: rgba(255, 255, 255, 0.9);
    margin: 0 auto 40px;
    max-width: 800px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .main-title {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #333;
      font-family: 'STXingkai', serif;
    }

    .subtitle {
      font-size: 18px;
      color: #666;
      margin-bottom: 25px;
    }

    .search-box {
      max-width: 500px;
      margin: 0 auto;
    }
  }

  .skeleton-container, .error-container, .empty-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .skeleton-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
  }

  .error-container {
    text-align: center;
    padding: 60px 20px;

    .el-icon {
      font-size: 60px;
      color: #909399;
      margin-bottom: 20px;
    }

    h2 {
      font-size: 24px;
      color: #606266;
      margin-bottom: 10px;
    }

    p {
      color: #909399;
      margin-bottom: 30px;
    }
  }

  .fictitious-container-list {
    padding: 0 40px;
    max-width: 1200px;
    margin: 0 auto;

    .elCard {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;

      .vr-card {
        width: 31%;
        margin-bottom: 30px;
        border-radius: 12px;
        overflow: hidden;
        background-color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .card-image {
          position: relative;
          height: 200px;
          overflow: hidden;

          .el-image {
            width: 100%;
            height: 100%;
            transition: transform 0.5s ease;
          }

          &:hover .el-image {
            transform: scale(1.1);
          }

          .vr-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 12px;
            display: flex;
            align-items: center;

            .el-icon {
              margin-right: 5px;
            }
          }

          .image-error {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #f5f7fa;

            .el-icon {
              font-size: 40px;
              color: #909399;
              margin-bottom: 10px;
            }
          }
        }

        .card-content {
          padding: 15px;

          .card-title {
            font-size: 18px;
            margin: 0 0 10px;
            color: #303133;
          }

          .card-meta {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;

            .meta-item {
              font-size: 12px;
              color: #909399;
              display: flex;
              align-items: center;

              .el-icon {
                margin-right: 5px;
              }
            }
          }

          .card-description {
            font-size: 14px;
            color: #606266;
            margin-bottom: 15px;
            line-height: 1.5;
            height: 42px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .card-action {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f0f2f5;
            color: #606266;
            padding: 8px 0;
            border-radius: 4px;
            transition: all 0.3s ease;

            .el-icon {
              margin-left: 5px;
            }

            &.active, &:hover {
              background-color: #409eff;
              color: white;
            }
          }
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

  .vr-guide {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    h3 {
      text-align: center;
      margin-bottom: 20px;
      font-size: 20px;
      color: #303133;
    }

    .guide-content {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;

      .guide-item {
        display: flex;
        align-items: center;
        width: 30%;
        min-width: 200px;
        margin-bottom: 15px;

        .guide-icon {
          font-size: 24px;
          margin-right: 10px;
        }

        .guide-text {
          h4 {
            margin: 0 0 5px;
            font-size: 16px;
            color: #303133;
          }

          p {
            margin: 0;
            font-size: 14px;
            color: #606266;
          }
        }
      }
    }
  }
}

</style>
