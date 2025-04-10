<template>
  <div class="vr-container">
    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack">
      <el-icon><ArrowLeft /></el-icon>
      <span>返回列表</span>
    </div>
    
    <!-- 全景图容器 -->
    <div class="viewer-container" id="viewer"></div>
    
    <!-- 切换按钮 -->
    <div class="switch-button" @click="changePanorama">
      <el-icon><Right /></el-icon>
      <span>下一个场景</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';
import { ElMessage } from 'element-plus';
import { ArrowLeft, Right } from '@element-plus/icons-vue';

// 引入本地图片
import panorama1 from '@/assets/qjt/qjt1.jpg';
import panorama2 from '@/assets/qjt/qjt2.jpg';
import panorama3 from '@/assets/qjt/qjt3.jpg';
import panorama4 from '@/assets/qjt/qjt4.jpg';
import panorama5 from '@/assets/qjt/qjt5.jpg';
import panorama6 from '@/assets/qjt/qjt6.jpg';

const route = useRoute();
const router = useRouter();
const viewer = ref(null);
const panoramas = [panorama1, panorama2, panorama3, panorama4, panorama5, panorama6];

// 根据路由参数设置初始全景图索引
const currentPanorama = ref(Number(route.params.fictitiousId) - 1);

// 返回列表页
const goBack = () => {
  router.push('/menu/fictitious');
};

// 切换全景图
const changePanorama = () => {
  if (viewer.value) {
    currentPanorama.value = (currentPanorama.value + 1) % panoramas.length;
    viewer.value.setPanorama(panoramas[currentPanorama.value])
      .then(() => {
        ElMessage.success(`已切换到场景 ${currentPanorama.value + 1}`);
      })
      .catch(err => {
        console.error('切换全景图失败:', err);
        ElMessage.error('切换场景失败，请重试');
      });
  }
};

onMounted(() => {
  // 验证索引是否有效
  if (currentPanorama.value < 0 || currentPanorama.value >= panoramas.length) {
    ElMessage.error('无效的场景ID');
    router.push('/menu/fictitious');
    return;
  }

  // 初始化Viewer
  viewer.value = new Viewer({
    container: document.querySelector('#viewer'),
    panorama: panoramas[currentPanorama.value],
    touchmoveTwoFingers: true,
    mousewheelCtrlKey: true,
    size: {
      width: '100%',
      height: '100%'
    },
    navbar: [
      'autorotate',
      'zoom',
      'caption',
      'fullscreen'
    ],
    plugins: []
  });

  // 添加事件监听
  viewer.value.addEventListener('ready', () => {
    ElMessage.success('全景图加载完成');
  });

  viewer.value.addEventListener('error', () => {
    ElMessage.error('全景图加载失败');
  });
});

onUnmounted(() => {
  if (viewer.value) {
    viewer.value.destroy();
    viewer.value = null;
  }
});
</script>

<style lang="scss" scoped>
.vr-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #000;
}

.viewer-container {
  width: 100%;
  height: 100%;
}

.back-button,
.switch-button {
  position: fixed;
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

.back-button {
  top: 20px;
  left: 20px;
}

.switch-button {
  bottom: 20px;
  right: 20px;
}
</style>