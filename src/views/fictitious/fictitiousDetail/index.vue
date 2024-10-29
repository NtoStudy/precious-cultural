<template>
<!--  <last-page/>-->
  <div class="vr">
    <!-- 全景图容器 -->
    <div id="viewer"></div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { Viewer } from 'photo-sphere-viewer';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';
import { hallPanoramaByIdGetApi } from "@/api/heritage/panorama.js";

const route = useRoute();
const url = ref(null);

// 根据路由参数获取全景图信息
const fetchPanorama = async () => {
  try {
    const res = await hallPanoramaByIdGetApi(route.params.fictitiousId);
    if (res.data && res.data.data.length > 0) {
      url.value = res.data.data[0].url;
    } else {
      console.error('未找到有效的全景图 URL');
    }
  } catch (error) {
    console.error('获取全景图信息时出错:', error);
  }
};

// 监听 URL 的变化并初始化视图
watchEffect(() => {
  if (url.value) {
    initViewer(url.value);
  }
});

// 初始化全景图的函数
const initViewer = (panoramaUrl) => {
  const viewer = new Viewer({
    container: document.querySelector('#viewer'),
    panorama: panoramaUrl,
    navbar: [
      'autorotate',
      'zoom',
      'move',
      'caption',
      'fullscreen'
    ],
    size: {
      width: '100%',
      height: '100vh'
    }
  });
};

// 页面挂载后调用数据获取函数
fetchPanorama();

</script>

<style scoped>
.vr {
  position: relative;
  overflow: hidden;
}
</style>
