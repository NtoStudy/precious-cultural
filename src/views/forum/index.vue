<template>
  <div class="article-list-container">
    <el-row :gutter="20" justify="center">
      <el-col :span="24">
        <el-card v-for="article in articles" :key="article.id" class="article-card">
          <div class="article-content">
            <img :src="article.image" alt="Article Image" class="article-image">
            <div class="article-info">
              <h2 class="article-title">{{ article.title }}</h2>
              <p class="article-content">{{ article.content }}</p>
              <div class="article-actions">
                <el-button type="primary" @click="likeArticle(article)" :icon="article.liked ? 'el-icon-like-filled' : 'el-icon-like'">{{ article.liked ? '已赞' : '点赞' }}</el-button>
                <span class="article-author">作者: {{ article.author }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {ElRow, ElCol, ElCard, ElButton} from 'element-plus';

const articles = ref([
  {
    id: 1,
    image: 'https://via.placeholder.com/150',
    title: '标题',
    content: '内容  在科研的道路上，研究生们常常面临着巨大的压力和挑战。为了给这个充满挑战的群体带来一些鼓励和温暖，我借助百度文心智能体平台开发了一个独特的智能体《萌猫科研加油喵》。',
    liked: false,
    author: 'smileNicky'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/150',
    title: '萌猫科研加油喵',
    content: '在科研的道路上，研究生们常常面临着巨大的压力和挑战。为了给这个充满挑战的群体带来一些鼓励和温暖，我借助百度文心智能体平台开发了一个独特的智能体《萌猫科研加油喵》。',
    liked: false,
    author: 'smileNicky'
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/150',
    title: '萌猫科研加油喵',
    content: '在科研的道路上，研究生们常常面临着巨大的压力和挑战。为了给这个充满挑战的群体带来一些鼓励和温暖，我借助百度文心智能体平台开发了一个独特的智能体《萌猫科研加油喵》。',
    liked: false,
    author: 'smileNicky'
  },
  // 更多文章...
]);

function likeArticle(article) {
  article.liked = !article.liked;
}
</script>

<style scoped lang="scss">
.article-list-container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.article-card {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.article-content {
  display: flex;
}

.article-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-right: 20px;
}

.article-info {
  flex: 1;
}

.article-title {
  margin: 10px 0;
}

.article-content {
  margin-bottom: 10px;
}

.article-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.article-author {
  margin-left: 10px;
}
</style>
