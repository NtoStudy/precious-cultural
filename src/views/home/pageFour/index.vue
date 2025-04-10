<script setup>
// 导入高德地图加载器与Vue的生命周期函数
import AMapLoader from "@amap/amap-jsapi-loader";
import { onMounted, onUnmounted, ref, reactive } from "vue";
import { ElMessage } from "element-plus";

// 创建响应式的地图和组件引用
const map = ref(null);
const mapContainer = ref(null);
const isLoading = ref(true);
const searchValue = ref('');

// 文化遗产地标数据
const heritageMarkers = reactive([
  { name: '故宫博物院', position: [116.397428, 39.90923], type: '世界文化遗产', desc: '中国明清两代的皇家宫殿，世界上现存规模最大、保存最为完整的木质结构古建筑之一。' },
  { name: '兵马俑', position: [109.278269, 34.384358], type: '世界文化遗产', desc: '秦始皇陵的陪葬坑，被誉为"世界第八大奇迹"。' },
  { name: '莫高窟', position: [94.815, 40.141667], type: '世界文化遗产', desc: '中国四大石窟之一，以精美的壁画和塑像闻名于世。' },
  { name: '平遥古城', position: [112.175, 37.201389], type: '世界文化遗产', desc: '中国保存最为完整的四大古城之一，是中国汉民族城市在明清时期的杰出范例。' },
  { name: '苏州园林', position: [120.619907, 31.299582], type: '世界文化遗产', desc: '中国私家园林的代表，以精巧的设计、优美的景色著称。' },
  { name: '丽江古城', position: [100.233333, 26.866667], type: '世界文化遗产', desc: '中国著名的历史文化名城，纳西族文化的重要载体。' },
  { name: '黄山', position: [118.166667, 30.133333], type: '世界文化与自然双重遗产', desc: '中国十大名山之一，以奇松、怪石、云海、温泉"四绝"著称。' },
  { name: '武夷山', position: [117.666667, 27.716667], type: '世界文化与自然双重遗产', desc: '道教名山，中国著名的文化与自然景观。' }
]);

// 当前选中的地标信息
const selectedMarker = ref(null);

// 函数：初始化地图、自动补全及位置搜索
const initMap = (AMap) => {
  // 创建地图实例
  map.value = new AMap.Map(mapContainer.value, {
    viewMode: '3D',
    zoom: 5, // 调整初始缩放级别以显示更多区域
    center: [105.0, 35.0], // 调整中心点到中国中部
    mapStyle: 'amap://styles/whitesmoke', // 使用白色风格地图
  });

  // 添加地图控件
  map.value.addControl(new AMap.Scale()); // 比例尺
  map.value.addControl(new AMap.ToolBar()); // 工具栏
  map.value.addControl(new AMap.MapType()); // 地图类型切换

  // 添加地图标记点
  addHeritageMarkers(AMap);

  // 创建搜索功能
  createSearchBox(AMap);

  isLoading.value = false;
};

// 添加文化遗产标记点
const addHeritageMarkers = (AMap) => {
  heritageMarkers.forEach(item => {
    // 创建标记
    const marker = new AMap.Marker({
      position: item.position,
      title: item.name,
      icon: new AMap.Icon({
        size: new AMap.Size(32, 32),
        image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
        imageSize: new AMap.Size(32, 32)
      }),
      animation: 'AMAP_ANIMATION_DROP',
      clickable: true
    });

    // 创建信息窗体
    const infoWindow = new AMap.InfoWindow({
      content: `<div class="info-window">
                  <h3>${item.name}</h3>
                  <p><strong>类型：</strong>${item.type}</p>
                  <p>${item.desc}</p>
                  <button class="info-btn">查看详情</button>
                </div>`,
      offset: new AMap.Pixel(0, -30)
    });

    // 点击标记时显示信息窗体
    marker.on('click', () => {
      infoWindow.open(map.value, marker.getPosition());
      selectedMarker.value = item;
    });

    // 将标记添加到地图
    marker.setMap(map.value);
  });
};

// 创建搜索框功能
const createSearchBox = (AMap) => {
  // 创建自动补全
  const autoComplete = new AMap.AutoComplete({
    input: 'search-input'
  });

  // 创建地点搜索服务
  const placeSearch = new AMap.PlaceSearch({
    map: map.value
  });

  // 自动补全选择事件
  autoComplete.on('select', (e) => {
    placeSearch.search(e.poi.name);
  });
};

// 搜索文化遗产地点
const searchHeritage = () => {
  if (!searchValue.value) {
    ElMessage.warning('请输入搜索内容');
    return;
  }

  // 查找匹配的地标
  const result = heritageMarkers.find(item =>
    item.name.includes(searchValue.value) ||
    item.type.includes(searchValue.value)
  );

  if (result) {
    // 找到匹配项，移动地图并放大
    map.value.setZoomAndCenter(12, result.position);

    // 显示信息
    selectedMarker.value = result;
    ElMessage.success(`已找到: ${result.name}`);
  } else {
    ElMessage.warning('未找到相关文化遗产地点');
  }
};

// 在组件挂载时加载高德地图
onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: 'df035b8f6029bcf2a23d64e6af753e6e',
  };

  AMapLoader.load({
    key: 'c826e163b010f8a66fb54abb4954a198',
    version: '2.0',
    plugins: [
      'AMap.Scale',
      'AMap.ToolBar',
      'AMap.MapType',
      'AMap.InfoWindow',
      'AMap.AutoComplete',
      'AMap.PlaceSearch'
    ],
  })
    .then(initMap)
    .catch((e) => {
      console.error('高德地图加载失败:', e);
      isLoading.value = false;
      ElMessage.error('地图加载失败，请刷新重试');
    });
});

// 在组件卸载时销毁地图及相关组件
onUnmounted(() => {
  if (map.value) {
    map.value.destroy();
  }
});
</script>

<template>
  <div class="map-container">
    <!-- 标题和搜索区域 -->
    <div class="map-header">
      <h2>文化遗产地理分布</h2>
      <div class="search-box">
        <input
          id="search-input"
          v-model="searchValue"
          type="text"
          placeholder="搜索文化遗产地点..."
          @keyup.enter="searchHeritage"
        />
        <el-button type="primary" @click="searchHeritage" height="32px">搜索</el-button>
      </div>
    </div>

    <!-- 地图区域 -->
    <div class="map-content">
      <!-- 地图加载中显示 -->
      <div v-if="isLoading" class="loading-overlay">
        <el-icon class="is-loading"><Loading /></el-icon>
        <p>地图加载中...</p>
      </div>

      <!-- 地图容器 -->
      <div ref="mapContainer" id="container"></div>

      <!-- 地标信息面板 -->
      <div v-if="selectedMarker" class="info-panel">
        <h3>{{ selectedMarker.name }}</h3>
        <p class="info-type">{{ selectedMarker.type }}</p>
        <p class="info-desc">{{ selectedMarker.desc }}</p>
        <div class="info-actions">
          <el-button type="primary" size="small">查看详情</el-button>
          <el-button size="small" @click="selectedMarker = null">关闭</el-button>
        </div>
      </div>
    </div>

    <!-- 底部说明 -->
    <div class="map-footer">
      <p>本地图展示了中国部分重要文化遗产地理位置，点击标记可查看详细信息</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.map-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .map-header {
    padding: 15px 20px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      margin: 0;
      color: #333;
      font-size: 24px;
    }

    .search-box {
      display: flex;
      width: 400px;

      input {
        flex: 1;
        padding: 0 15px;
        border: 1px solid #dcdfe6;
        border-radius: 4px 0 0 4px;
        outline: none;

        &:focus {
          border-color: #409eff;
        }
      }

      .el-button {
        border-radius: 0 4px 4px 0;
      }
    }
  }

  .map-content {
    flex: 1;
    position: relative;

    #container {
      height: 100%;
      width: 100%;
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 100;

      .el-icon {
        font-size: 40px;
        color: #409eff;
        margin-bottom: 15px;
      }

      p {
        font-size: 18px;
        color: #606266;
      }
    }

    .info-panel {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 300px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      padding: 15px;
      z-index: 20;

      h3 {
        margin-top: 0;
        margin-bottom: 10px;
        color: #303133;
        font-size: 18px;
      }

      .info-type {
        color: #409eff;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .info-desc {
        color: #606266;
        line-height: 1.6;
        margin-bottom: 15px;
      }

      .info-actions {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .map-footer {
    padding: 10px 20px;
    background-color: rgba(255, 255, 255, 0.9);
    text-align: center;
    color: #909399;
    font-size: 14px;
    border-top: 1px solid #ebeef5;
  }
}

:deep(.info-window) {
  padding: 5px;
  max-width: 280px;

  h3 {
    margin-top: 0;
    color: #303133;
  }

  p {
    margin: 5px 0;
    color: #606266;
  }

  .info-btn {
    background-color: #409eff;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 5px;

    &:hover {
      background-color: #66b1ff;
    }
  }
}
</style>
