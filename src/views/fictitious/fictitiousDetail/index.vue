<template>
<!--  <last-page/>-->
  <div class="vr">
    <!-- 全景图容器 -->
    <div id="viewer"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Viewer } from 'photo-sphere-viewer';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';
// 使用 useRoute 获取路由信息
const route = useRoute();
// 从路由查询参数中获取 imgUrl
const url = ref(route.query.url);


// 初始化全景图的函数
const initViewer = () => {
  if (url.value) {
    const viewer = new Viewer({
      container: document.querySelector('#viewer'),
      panorama: url.value,
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
  }
};

// 在组件挂载后调用 initViewer 函数
onMounted(() => {
  initViewer();
});

</script>

<style scoped>
.vr {
  position: relative;
  overflow: hidden;
}

</style>
