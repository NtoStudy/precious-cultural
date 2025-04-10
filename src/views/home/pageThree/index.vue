<script setup>
import * as echarts from 'echarts'
import { onMounted, ref, onBeforeUnmount } from "vue";

// 初始Echarts实例对象
let mChart = null;
const target = ref(null);
const isLoading = ref(false);

// 数据
const dataAxis = ['民间文学', '传统音乐', '传统舞蹈', '传统戏剧', '曲艺', '传统体育', '传统美术', '传统技艺', '传统医药', '民俗'];
const data = [432, 234, 563, 532, 294, 846, 459, 712, 812, 267];

// 窗口大小变化时重新调整图表大小
const handleResize = () => {
  mChart && mChart.resize();
};

// 重置缩放
const resetZoom = () => {
  if (mChart) {
    mChart.dispatchAction({
      type: 'dataZoom',
      start: 0,
      end: 100
    });
  }
};

onMounted(() => {
  try {
    isLoading.value = true;
    mChart = echarts.init(target.value);
    renderChart();
    
    // 添加窗口大小变化监听
    window.addEventListener('resize', handleResize);
  } catch (error) {
    console.error("Echarts 初始化失败:", error);
  } finally {
    isLoading.value = false;
  }
});

// 组件卸载前清理资源
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  mChart && mChart.dispose();
  mChart = null;
});

const renderChart = () => {
  const options = {
    title: {
      text: '论坛热度排行榜',
      subtext: '点击柱状图可进行缩放',
      left: 'center',
      textStyle: {
        fontSize: 24
      },
      subtextStyle: {
        fontSize: 14
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function(params) {
        const data = params[0];
        return `${data.name}<br/>热度: ${data.value}`;
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        show: true,
        fontSize: 14,
        color: '#666',
        interval: 0,
        rotate: 30
      },
      axisTick: { show: false },
      axisLine: { show: false },
      z: 1
    },
    yAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#999',
        fontSize: 14,
      }
    },
    dataZoom: [
      { 
        type: 'inside',
        start: 0,
        end: 100
      },
      {
        type: 'slider',
        show: true,
        start: 0,
        end: 100
      }
    ],
    series: [{
      type: 'bar',
      name: '热度',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ]),
        borderRadius: [5, 5, 0, 0]
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2378f7' },
            { offset: 1, color: '#83bff6' }
          ])
        }
      },
      data: data
    }]
  };

  // 给柱状图增加点击特效
  const zoomSize = 6;
  mChart.on('click', (params) => {
    const startIndex = Math.max(params.dataIndex - Math.floor(zoomSize / 2), 0);
    const endIndex = Math.min(params.dataIndex + Math.floor(zoomSize / 2), data.length - 1);

    mChart.dispatchAction({
      type: 'dataZoom',
      startValue: dataAxis[startIndex],
      endValue: dataAxis[endIndex]
    });
  });

  // 设置图表配置
  mChart.setOption(options);
};
</script>

<template>
  <div class="chart-wrapper">
    <div ref="target" class="chart-container"></div>
    <el-button v-if="mChart" class="reset-button" type="primary" size="small" @click="resetZoom">
      重置缩放
    </el-button>
    <div v-if="isLoading" class="loading-overlay">
      <el-icon class="is-loading"><Loading /></el-icon>
      <span>加载中...</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  
  .chart-container {
    width: 100%;
    height: 100%;
    min-height: 400px;
  }
  
  .reset-button {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;
  }
  
  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 100;
    
    .el-icon {
      font-size: 32px;
      margin-bottom: 10px;
    }
  }
}
</style>