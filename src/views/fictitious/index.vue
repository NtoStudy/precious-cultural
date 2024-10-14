<script setup>
import { onMounted } from 'vue';
import { Viewer } from 'photo-sphere-viewer' // 引入插件
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css' //引入CSS样式
// 全景图初始化
const initViewer = () => {
  const viewer = new Viewer({
    container: document.querySelector('#viewer'), // 容器
    panorama: 'https://takeaway-hei.oss-cn-hangzhou.aliyuncs.com/qjt.jpg', // 全景图地址
    navbar: [
      'autorotate',
      'zoom',
      'move',
      'caption',
      'fullscreen'
    ],
    size: {
      width: '100%',
      height: '682px' // 或者你想要的高度
    }
  });
};

onMounted(() => {
  initViewer();
});
</script>

<template>
  <div class="vr">
    <div id="viewer"></div> <!-- 全景图容器 -->
  </div>
</template>

<style lang="scss" scoped>
.vr {
  width: 100%;
  height: 682px;
  position: relative;
  overflow: hidden;

  #viewer {
    width: 100%;
    height: 615px; // 或者你想要的高度
  }
}
</style>
