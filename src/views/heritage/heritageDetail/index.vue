<template>
  <div class="article-container">
    <div class="article-header">
      <h1>非遗名称：这里是非遗名称</h1>
      <div class="article-meta">
        <span>来源：这里填写非遗所在地</span>
        <span> 作者：这里填写非遗专家名字 </span>
      </div>
      <el-divider/>
    </div>
    <div class="article-content">
      <p>
        内容：这里填写非遗的详细内容内容： 这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：
        这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：
        这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：
        这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：
        这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：
        这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：
        这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容内容：这里填写非遗的详细内容
      </p>
      <img src="" alt="这里是图片，" />
    </div>
  </div>
</template>

<script setup>
import {ElDivider} from 'element-plus'
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
    padding: 0 40px;
    img{
      height: 200px;
      width: 400px;
      border: 1px solid #ddd;
    }
  }
}


</style>
