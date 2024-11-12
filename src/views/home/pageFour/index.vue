<script setup>
// 导入高德地图加载器与Vue的生命周期函数
import AMapLoader from "@amap/amap-jsapi-loader";
import { onMounted, onUnmounted, ref } from "vue";

// 创建响应式的地图和组件引用
const map = ref(null);

// 函数：初始化地图、自动补全及位置搜索
const initMap = (AMap) => {
  map.value = new AMap.Map('container', {
    viewMode: '3D',
    zoom: 11,
    center: [116.397428, 39.90923],
  });
};

// 在组件挂载时加载高德地图
onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: 'df035b8f6029bcf2a23d64e6af753e6e',
  };

  AMapLoader.load({
    key: 'c826e163b010f8a66fb54abb4954a198',
    version: '2.0',
    plugins: ['AMap.Scale'],
  })
    .then(initMap)
    .catch((e) => {
      console.error('高德地图加载失败:', e);
    });
});

// 在组件卸载时销毁地图及相关组件
onUnmounted(() => {
  map.value?.destroy();
});

</script>

<template>
  <div id="container">
  </div>
</template>

<style lang="scss" scoped>
#container {
  height: 100%;
  width: 100%;
}
</style>

