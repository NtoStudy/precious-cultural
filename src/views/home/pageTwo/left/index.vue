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
const renderChart = () => {
  const options = {
    // 控制标题
    title: {
      text: '国家级代表性项目',
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
      left: 'left'
    },
    series: [
      {
        // 悬浮时候的提示框
        name: '项目代表',
        // 控制饼图的类型
        type: 'pie',
        // 控制饼图大小
        radius: '60%',

        data: [
          { value: 261, name: '民间文学' },
          { value: 431, name: '传统音乐' },
          { value: 356, name: '传统舞蹈' },
          { value: 473, name: '传统戏剧' },
          { value: 213, name: '曲艺' },
          { value: 166, name: '传统体育' },
          { value: 417, name: '传统美术' },
          { value: 629, name: '传统技艺' },
          { value: 182, name: '传统医药' },
          { value: 492, name: '民俗' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  // 3.通过实例.setOptions(option)
  mChart.setOption(options)
}
</script>

<template>
  <div ref="target" style="width: 100%; height: 100%;"></div>
</template>

<style lang="scss" scoped>

</style>
