<script setup>
import { ref } from 'vue'
const choiceTable = ref('choiceTable')
import Left from './left/index.vue'
import Right from './right/index.vue'
</script>

<template>
  <div style="display: flex; height: 100%; position: relative;">
    <div style="position: absolute; top: 20px; right: 20px; z-index: 1;">
      <el-radio-group v-model="choiceTable" size="large">
        <el-radio-button label="项目数据" value="choiceTable" />
        <el-radio-button label="传承人数据" value="choiceTableElse" />
      </el-radio-group>
    </div>
    <Left style="width: 100%; height: 100%;" v-if="choiceTable === 'choiceTable'" />
    <Right style="width: 100%; height: 100%; float: right;" v-else/>
  </div>
</template>

<style lang="scss" scoped>

</style>
