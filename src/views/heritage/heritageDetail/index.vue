<template>
  <last-page/>
  <div class="article-container">
    <div class="article-header">
      <h1>田青：幽兰春晓 古琴复兴
        ——《幽兰春晓——“古琴艺术”申遗二十周年纪念文集》序</h1>
      <div class="article-meta">
        <span>来源：中国艺术报</span>
        <span>作者：田青</span>
      </div>
      <el-divider/>
    </div>
    <div class="article-content" v-html="str1">
    </div>

  </div>

</template>

<script setup>
import {ElDivider} from 'element-plus'
import {str} from "./content.js"
import {ref} from "vue";
import LastPage from "@/components/lastPage.vue";
const str1 = ref('')
str1.value = str
</script>

<style lang="scss" scoped>
.article-container {
  height: 100vh;
  .article-header {
    padding: 20px;
    text-align: center;

    h1 {
      font-size: 24px;
      margin-top: 20px;
      margin-bottom: 20px;
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
  .article-content{
    padding:0 100px;
    font-family: Arial, sans-serif; /* 设置字体 */
    line-height: 1.8; /* 设置行高 */
    letter-spacing: 1px; /* 增加字间距 */
    img{
      height: 200px;
      width: 400px;
      border: 1px solid #ddd;
    }
  }
}


</style>
