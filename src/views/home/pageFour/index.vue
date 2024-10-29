<script setup>
// 导入高德地图加载器与Vue的生命周期函数
import AMapLoader from "@amap/amap-jsapi-loader";
import { onMounted, onUnmounted, ref } from "vue";

// 创建响应式的地图和组件引用
const map = ref(null);
const autoComplete = ref(null);
const placeSearch = ref(null);

// 处理输入提示
// 函数：处理用户输入事件并进行自动补全搜索
function handleInput(event) {
  const keywords = event.target.value.trim(); // 去除前后空格
  if (keywords) {
    autoComplete.value.search(keywords, (status, result) => {
      if (status === 'complete' && result.info === 'OK') {
        console.log(result);
      } else {
        console.error('输入提示获取失败:', result.info);
      }
    });
  }
}

// 函数：初始化地图、自动补全及位置搜索
const initMap = (AMap) => {
  map.value = new AMap.Map('container', {
    viewMode: '3D',
    zoom: 11,
    center: [116.397428, 39.90923],
  });

  autoComplete.value = new AMap.Autocomplete();
  placeSearch.value = new AMap.PlaceSearch();
};

// 在组件挂载时加载高德地图
onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: 'df035b8f6029bcf2a23d64e6af753e6e',
  };

  AMapLoader.load({
    key: 'c826e163b010f8a66fb54abb4954a198',
    version: '2.0',
    plugins: ['AMap.Scale', 'AMap.AutoComplete', 'AMap.PlaceSearch'],
  })
    .then(initMap)
    .catch((e) => {
      console.error('高德地图加载失败:', e);
    });
});

// 在组件卸载时销毁地图及相关组件
onUnmounted(() => {
  map.value?.destroy();
  autoComplete.value?.destroy();
  placeSearch.value?.destroy();
});

</script>

<template>
  <div id="container">
    <input type="text" placeholder="输入地址" @input="handleInput" style="z-index: 999999999999;" />
  </div>
</template>

<style lang="scss" scoped>
#container {
  height: 100%;
  width: 100%;
}
</style>

