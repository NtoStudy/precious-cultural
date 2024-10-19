<script setup>
import * as echarts from 'echarts'
import {onMounted, ref} from "vue";
// 1.初始Echarts实例对象
let mChart = null
const target = ref(null);
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})
// 2.数据
// prettier-ignore
let dataAxis = ['民间文学','传统音乐','传统舞蹈','传统戏剧','曲艺','传统体育','传统美术','传统技艺','传统医药','民俗'];
// prettier-ignore
let data = [432,234,563,532,294,846,459,712,812,267];
const renderChart = () => {
  const options = {
    title: {
      text: '论坛热度排行榜',
      subtext: '点击可进行缩放',
      // left: 'center'
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        show: true,
        fontSize: 16,
        color: '#666'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 1
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999',
        fontSize: 16,
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: false,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: data
      }
    ]
  };
  // 给柱状图增加点击特效
  const zoomSize = 6;
  mChart.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    mChart.dispatchAction({
      type: 'dataZoom',
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
          dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
  });
  // 3.通过实例.setOptions(option)
  mChart.setOption(options)
}

</script>

<template>
  <div ref="target" style="width: 100%; height: 100%"></div>
</template>

<style lang="scss" scoped>

</style>
