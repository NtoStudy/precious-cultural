<template>
  <el-button @click="goBack" class="last-page" to=router.go(-1)> &lt;&lt; 返回上一页</el-button>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goBack = () => {
  router.go(-1); 
};
</script>

<style scoped lang="scss">
.last-page{
  margin-top: 10px;
  margin-left:20px;;
  margin-bottom: 20px;
}
</style>
