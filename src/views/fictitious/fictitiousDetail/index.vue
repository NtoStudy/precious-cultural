<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
// 确保使用正确的导入方式
import {Viewer} from '@photo-sphere-viewer/core';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';
import 'photo-sphere-viewer/dist/plugins/markers.css';
import {hallPanoramaByIdGetApi} from "@/api/heritage/panorama.js";
import {ElMessage} from 'element-plus';
import {ArrowLeft, Loading, Picture, QuestionFilled} from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const url = ref(null);
const loading = ref(true);
const error = ref(false);
const errorMessage = ref('');
const showGuide = ref(false);
const panoramaData = ref(null);
let viewer = null;

// 返回上一页
const goBack = () => {
  router.back();
};


// 根据路由参数获取全景图信息
const fetchPanorama = async () => {
  try {
    loading.value = true;
    error.value = false;

    const res = await hallPanoramaByIdGetApi(route.params.fictitiousId);
    if (res.data && res.data.data && res.data.data.length > 0) {

      // 使用代理URL
      url.value = res.data.data[0].url
      // 初始化全景图
      setTimeout(() => {
        initViewer(url.value);
      }, 100);
    } else {
      error.value = true;
      errorMessage.value = '未找到有效的全景图数据';
      console.error('未找到有效的全景图 URL');
    }
  } catch (err) {
    error.value = true;
    errorMessage.value = '获取全景图数据失败，请稍后重试';
    console.error('获取全景图信息时出错:', err);
  } finally {
    loading.value = false;
  }
};

// 初始化全景图的函数
const initViewer = (panoramaUrl) => {
  // 确保DOM元素存在
  const container = document.getElementById('viewer');
  if (!container) {
    return;
  }

  // 如果已存在实例，先销毁
  if (viewer) {
    viewer.destroy();
    viewer = null;
  }

  // 创建新实例
  viewer = new Viewer({
    container: container,
    panorama: panoramaUrl,

    navbar: [
      'autorotate',
      'zoom',
      'move',
      'caption',
      'fullscreen'
    ],
    caption: panoramaData.value?.name || '文化遗产全景展示',
    defaultZoomLvl: 50,
    minFov: 30,
    maxFov: 100,
    moveSpeed: 1.5,
    // 修复：mousewheel应该是布尔值，不能设置passive属性
    mousewheel: true,
    touchmoveTwoFingers: true,
    size: {
      width: '100%',
      height: '100vh'
    }
  });

  // 使用正确的事件监听方法
  viewer.addEventListener('ready', () => {
    ElMessage.success('全景加载完成，可以开始浏览');
  });

  // 错误处理
  viewer.addEventListener('error', (e) => {
    console.error('全景图错误:', e);
    error.value = true;
    errorMessage.value = '全景图加载失败，请稍后重试';

  });

};


// 获取标记点数据
const getMarkers = () => {
  // 这里可以根据实际数据动态生成标记点
  return [
    {
      id: 'marker-1',
      position: {yaw: 0.2, pitch: 0},
      tooltip: '文化遗产介绍点1',
      content: '这是一个重要的文化遗产点，点击查看详情',
      className: 'custom-marker',
    },
    {
      id: 'marker-2',
      position: {yaw: -0.5, pitch: 0.2},
      tooltip: '文化遗产介绍点2',
      content: '这是另一个重要的文化遗产点，点击查看详情',
      className: 'custom-marker',
    }
  ];
};

// 组件挂载时获取数据
onMounted(() => {
  // 延迟执行，确保DOM已完全渲染
  setTimeout(() => {
    fetchPanorama();
  }, 200);
});

// 组件卸载时清理资源
onUnmounted(() => {
  if (viewer) {
    viewer.destroy();
    viewer = null;
  }
});
</script>

<template>
  <div class="vr-container">
    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack">
      <el-icon>
        <ArrowLeft/>
      </el-icon>
      <span>返回列表</span>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <el-icon class="is-loading">
        <Loading/>
      </el-icon>
      <p>全景加载中，请稍候...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error-container">
      <el-icon>
        <Picture/>
      </el-icon>
      <h2>全景加载失败</h2>
      <p>{{ errorMessage }}</p>
      <el-button type="primary" @click="fetchPanorama">重新加载</el-button>
    </div>

    <!-- 全景图容器 -->
    <div id="viewer" class="viewer-container"></div>

    <!-- 操作指南 -->
    <div class="controls-guide" v-if="!loading && !error">
      <div class="guide-toggle" @click="showGuide = !showGuide">
        <el-icon>
          <QuestionFilled/>
        </el-icon>
        <span>操作指南</span>
      </div>

      <transition name="slide">
        <div class="guide-panel" v-if="showGuide">
          <h3>VR全景操作指南</h3>
          <ul>
            <li><strong>旋转视角：</strong>点击并拖动鼠标</li>
            <li><strong>放大/缩小：</strong>使用鼠标滚轮或点击工具栏上的放大/缩小按钮</li>
            <li><strong>全屏模式：</strong>点击工具栏上的全屏按钮</li>
            <li><strong>自动旋转：</strong>点击工具栏上的自动旋转按钮</li>
          </ul>
          <div class="close-guide" @click="showGuide = false">关闭</div>
        </div>
      </transition>
    </div>

    <!-- 全景信息 -->
    <div class="panorama-info" v-if="panoramaData && !loading && !error">
      <h2>{{ panoramaData.name || '全景展示' }}</h2>
      <p>{{ panoramaData.description || '暂无描述' }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.vr-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .back-button {
    position: fixed;
    top: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }

    .el-icon {
      margin-right: 5px;
    }
  }

  .loading-container, .error-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    z-index: 100;

    .el-icon {
      font-size: 48px;
      margin-bottom: 20px;
    }

    p {
      font-size: 18px;
      margin-bottom: 20px;
    }
  }

  .viewer-container {
    width: 100%;
    height: 100%;
  }

  .controls-guide {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;

    .guide-toggle {
      display: flex;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.6);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: rgba(0, 0, 0, 0.8);
      }

      .el-icon {
        margin-right: 5px;
      }
    }

    .guide-panel {
      position: absolute;
      bottom: 50px;
      right: 0;
      width: 300px;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

      h3 {
        margin-top: 0;
        margin-bottom: 15px;
        font-size: 18px;
        text-align: center;
      }

      ul {
        padding-left: 20px;
        margin-bottom: 15px;

        li {
          margin-bottom: 8px;
          font-size: 14px;
        }
      }

      .close-guide {
        text-align: center;
        padding: 5px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }

  .panorama-info {
    position: fixed;
    bottom: 20px;
    left: 20px;
    max-width: 400px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 15px;
    border-radius: 10px;
    z-index: 1000;

    h2 {
      margin-top: 0;
      margin-bottom: 10px;
      font-size: 18px;
    }

    p {
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
    }
  }
}

// 自定义标记样式
:deep(.custom-marker) {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  border: 2px solid #409eff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
    background-color: #409eff;
  }
}

// 过渡动画
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
