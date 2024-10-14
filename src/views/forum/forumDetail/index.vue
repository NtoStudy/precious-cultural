<template>
  <LastPage />
  <div class="layout-container">
    <el-card class="article-card" style="width: 74%;">
      <h1 class="article-title">Vue3.4+Element-plus+Vite通用后台管理系统</h1>
      <p class="article-meta">作者: Dragon_xjy · 2024-06-14</p>
      <div class="article-content">
        <p>网上的后台管理系统模板一大堆，删起来麻烦，xjy_admin是我自己搭建的通用后台管理模板...</p>
        <h2>前言</h2>
        <p>经过一段时间的打磨（具体忘了），迎来管理系统的第一个版本...</p>
      </div>
    </el-card>

    <el-card class="author-card" style="width: 22%;">
      <div class="author-info">
        <img src="https://via.placeholder.com/50" alt="Avatar" class="author-avatar" />
        <div>
          <h3 style="margin-bottom: 5px;">作者名称</h3>
          <p>掘金年度资深创作者</p>
        </div>
      </div>
      <div class="author-stats">
        <div class="author-content">
          <p>8 文章</p>
          <p>37k 阅读</p>
          <p>66 粉丝</p></div>
        <div class="buttons">
          <el-button type="primary" style="height: 40px; width: 100px;">关注</el-button>
          <el-button size="large" style="height: 40px; width: 100px;">私信</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import LastPage from  "@/components/lastPage.vue";
</script>

<style scoped lang="scss">
.layout-container {
  display: flex;
  padding: 0 100px;
  justify-content: space-between;

  .article-card {
    text-align: center;
    .article-title {
      font-size: 24px;
      font-weight: bold;
    }

    .article-meta {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .article-content{
      font-size: 16px;
    }
  }
}


.author-card {
  .author-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .author-avatar {
      border-radius: 50%;
      margin-right: 12px;
    }

    h3 {
      margin: 0;
      font-size: 18px;
    }

    p {
      color: #666;
    }
  }

  .author-stats {
    .author-content{
      display: flex;
      justify-content: space-between;
      font-size: 16px;
    }
    p {
      margin: 5px 0;
      font-weight: bold;
    }

    .buttons {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
