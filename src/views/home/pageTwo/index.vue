<script setup>
import { ref } from 'vue'
const choiceTable = ref('choiceTable') // 默认选择

import Left from './left/index.vue'
import Right from './right/index.vue'

// 错误处理
const validateChoiceTable = () => {
  const validChoices = ['choiceTable', 'choiceTableElse'];
  if (!validChoices.includes(choiceTable.value)) {
    console.error(`无效选择: ${choiceTable.value}`);
    choiceTable.value = 'choiceTable'; // 设置为默认值
  }
}

// 初始验证
validateChoiceTable();
</script>

<template>
  <div style="display: flex; height: 100%; position: relative;">
    <div style="position: absolute; top: 20px; right: 20px; z-index: 1;">
      <el-radio-group v-model="choiceTable" size="large" @change="validateChoiceTable">
        <el-radio-button label="项目数据" value="choiceTable" />
        <el-radio-button label="传承人数据" value="choiceTableElse" />
      </el-radio-group>
    </div>
    <component :is="choiceTable === 'choiceTable' ? Left : Right" style="width: 100%; height: 100%;" />
  </div>
</template>

<style lang="scss" scoped>

</style>
