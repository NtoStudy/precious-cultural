<script setup>
import {ElDivider} from 'element-plus'
import {defineProps, onMounted, ref} from 'vue';
import {userNonHeritageByIdApi} from "@/api/user.js";

const props = defineProps({
  heritageId: String
});

const userNonHeritageData = ref({})
const userNonHeritageById = async () => {
   const res = await userNonHeritageByIdApi(props.heritageId);
  userNonHeritageData.value = res.data.data
   console.log(userNonHeritageData.value)
}
onMounted(()=>{
  userNonHeritageById()
})

</script>

<template>
  <div class="article-container">
    <div class="article-header">
      <h1>田青：幽兰春晓 古琴复兴 ——《幽兰春晓——“古琴艺术”申遗二十周年纪念文集》序</h1>
      <div class="article-meta">
        <span>诞生时间：{{userNonHeritageData.inheritanceBirth}}</span>
        <span>项目传承单位：{{userNonHeritageData.protectionUnit}}</span>
        <span>级别：{{userNonHeritageData.level}}</span>
      </div>
      <div class="article-meta">
        <span>项目分布：{{userNonHeritageData.declaringArea}}</span>
        <span>申报单位：{{userNonHeritageData.geographicDistribution}}</span>
      </div>
      <el-divider/>
    </div>


  </div>

</template>

<style lang="scss" scoped>
.article-container {
  background-image: url("@/assets/detailbg.png");
  background-size: cover;
  background-position: center;

  .article-header {
    padding: 20px;
    text-align: center;
    h1 {
      font-size: 26px;
      margin-top: 20px;
      margin-bottom: 20px;
      font-family: "STLiti", "华文隶书", sans-serif; /* 设置为华文隶书 */
    }

    .article-meta {
      font-size: 14px;
      color: #888;
      margin-bottom: 20px;

      span {
        margin-right: 20px;
      }
    }

    p {
      margin-bottom: 20px;
      line-height: 1.6;
    }
  }

}


</style>
