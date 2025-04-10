<script setup>
import * as echarts from 'echarts'
import { onMounted, ref, onBeforeUnmount } from "vue";

// 初始Echarts实例对象
let mChart = null
const target = ref(null);

// 图表数据
const chartData = [
  { value: 123, name: '民间文学' },
  { value: 380, name: '传统音乐' },
  { value: 298, name: '传统舞蹈' },
  { value: 782, name: '传统戏剧' },
  { value: 207, name: '曲艺' },
  { value: 87, name: '传统体育' },
  { value: 377, name: '传统美术' },
  { value: 513, name: '传统技艺' },
  { value: 130, name: '传统医药' },
  { value: 160, name: '民俗' }
];

// 窗口大小变化时重新调整图表大小
const handleResize = () => {
  mChart && mChart.resize();
};

onMounted(() => {
  // 初始化图表
  mChart = echarts.init(target.value);
  renderChart();
  
  // 添加窗口大小变化监听
  window.addEventListener('resize', handleResize);
});

// 组件卸载前清理资源
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  mChart && mChart.dispose();
  mChart = null;
});

const renderChart = () => {
  // 计算总数用于百分比显示
  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  
  const options = {
    // 控制标题
    title: {
      text: '国家级代表性项目传承人',
      subtext: '数据来自国务院及国家文化和旅游行政主管部门公开信息，台湾省暂无数据',
      textStyle:{
        fontSize: 36,
      },
      subtextStyle:{
        fontSize: 16,
      },
      left: 'center'
    },
    // 控制鼠标悬浮提示框
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    // 控制侧边图例
    legend: {
      orient: 'vertical',
      left: 'left',
      type: 'scroll',
      textStyle: {
        fontSize: 14
      }
    },
    series: [
      {
        name: '项目代表',
        type: 'pie',
        radius: ['40%', '60%'], // 改为环形图
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold'
          }
        },
        label: {
          show: true,
          formatter: '{b}: {c} ({d}%)'
        },
        labelLine: {
          show: true
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }
    ]
  }

  // 设置图表配置
  mChart.setOption(options);
}
</script>

<template>
  <div ref="target" class="chart-container"></div>
</template>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>