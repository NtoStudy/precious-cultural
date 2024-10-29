<script setup>
import AMapLoader from "@amap/amap-jsapi-loader";
import {onMounted, onUnmounted, ref} from "vue";

const map = ref(null);
const autoComplete = ref(null);
const placeSearch = ref(null);

// 在这里添加handleInput方法来处理输入提示
function handleInput(event) {
  const keywords = event.target.value;
  if (keywords) {
    autoComplete.value.search(keywords, (status, result) => {
      // 处理输入提示结果
      if (status === 'complete' && result.info === 'OK') {
        console.log(result);
      }
    });
  }
}

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: 'df035b8f6029bcf2a23d64e6af753e6e', // 从高德开放平台获取的安全密钥
  };

  AMapLoader.load({
    key: 'c826e163b010f8a66fb54abb4954a198', // 从高德开放平台获取的Key
    version: '2.0', // 指定要加载的 JSAPI 的版本
    plugins: ['AMap.Scale', 'AMap.AutoComplete', 'AMap.PlaceSearch'], // 需要使用的插件列表
  })
      .then((AMap) => {
        map.value = new AMap.Map('container', {
          viewMode: '3D', // 是否为3D地图模式
          zoom: 11, // 初始化地图级别
          center: [116.397428, 39.90923], // 初始化地图中心点坐标
        });

        // 实例化Autocomplete
        autoComplete.value = new AMap.Autocomplete({
          // 其他配置
        });

        // 实例化PlaceSearch
        placeSearch.value = new AMap.PlaceSearch({
          // 其他配置
        });
      })
      .catch((e) => {
        console.log(e);
      });
});

onUnmounted(() => {
  map.value?.destroy();
  autoComplete.value?.destroy();
  placeSearch.value?.destroy();
});

</script>

<template>
  <div id="container">
    <input type="text" placeholder="输入地址" @input="handleInput" style="z-index: 1000;"/>
  </div>
</template>

<style lang="scss" scoped>
#container {
  height: 100%;
  width: 100%;
}
</style>
